import React, { useState, useEffect, useCallback, Suspense } from 'react';
import '../../styles/superadmin/SuperAdminDashboard.css';
import { toast } from 'react-toastify'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css';

// Import new components and services
const DashboardOverview = React.lazy(() => import('./DashboardOverview'));
const UserList = React.lazy(() => import('./UserList'));
const UserForm = React.lazy(() => import('./UserForm'));
import ConfirmationDialog from '../../components/common/ConfirmationDialog'; // Import ConfirmationDialog
import { userService } from '../../api/userService'; // Import userService
import { authService } from '../../api/authService'; // Import authService for logout
import { useAuth } from '../../context/AuthContext';

function SuperAdminDashboardPage() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
    activeBookings: 0,
    recentUsers: [],
    recentBookings: []
  });
  const [editingUser, setEditingUser] = useState(null);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState('');

  // State for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null); // Callback function for confirmed action
  const [targetUserId, setTargetUserId] = useState(null); // User ID for the pending action

  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const toastConfig = React.useMemo(() => ({
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }), []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userService.getAllUsers();
      const { status, message, data } = response.data;
      if (status) {
        setUsers(data);
      } else {
        setError(message || 'Failed to fetch users');
        toast.error(message || 'Failed to fetch users', toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch users';
      setError(errorMessage);
      toast.error(errorMessage, toastConfig);
    } finally {
      setLoading(false);
    }
  }, [toastConfig]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await userService.getAllUsers();
      const { status, message, data } = response.data;
      
      if (status) {
        setStats(prevStats => ({
          ...prevStats,
          totalUsers: data.length,
          recentUsers: data.slice(0, 5),
          // TODO: Fetch real property and booking counts from backend once endpoints are available
          totalProperties: prevStats.totalProperties,
          totalBookings: prevStats.totalBookings,
          activeBookings: prevStats.activeBookings,
          recentBookings: prevStats.recentBookings
        }));
      } else {
        console.error('Failed to fetch stats:', message);
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stats';
      console.error('Failed to fetch stats:', err);
      toast.error(errorMessage, toastConfig);
    }
  }, [toastConfig]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers, fetchStats]);

  const handleAddUserSubmit = useCallback(async (userData) => {
    setAddUserLoading(true);
    setAddUserError('');
    try {
      let response;
      if (userData.id) {
        response = await userService.updateUser(userData.id, userData);
      } else {
        response = await userService.createUser(userData);
      }
      
      const { status, message } = response.data;
      if (status) {
        toast.success(message || `User ${userData.id ? 'updated' : 'added'} successfully!`, toastConfig);
        setActiveSection('users');
        fetchUsers();
        fetchStats();
      } else {
        setAddUserError(message || `Failed to ${userData.id ? 'update' : 'add'} user.`);
        toast.error(message || `Failed to ${userData.id ? 'update' : 'add'} user.`, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to ${userData.id ? 'update' : 'add'} user.`;
      setAddUserError(errorMessage);
      toast.error(errorMessage, toastConfig);
    } finally {
      setAddUserLoading(false);
    }
  }, [fetchUsers, fetchStats, toastConfig]);

  const handleEditUser = useCallback((user) => {
    setEditingUser(user);
    setActiveSection('add-user');
  }, []);

  // Functions to handle the actual delete/toggle after confirmation
  const executeDeleteUser = useCallback(async (userId) => {
    try {
      const response = await userService.deleteUser(userId);
      const { status, message } = response.data;
      if (status) {
        toast.success(message, toastConfig);
        await fetchUsers();
        await fetchStats();
      } else {
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage, toastConfig);
    }
  }, [fetchUsers, fetchStats, toastConfig]);

  const executeToggleUserStatus = useCallback(async (userId) => {
    try {
      setLoading(true);
      const response = await userService.toggleUserStatus(userId);
      const { status, message } = response.data;
      if (status) {
        toast.success(message, toastConfig);
        await fetchUsers();
        await fetchStats();
      } else {
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to toggle user status';
      toast.error(errorMessage, toastConfig);
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, fetchStats, toastConfig]);

  // Handlers to show the confirmation dialog
  const handleDeleteUser = useCallback((userId) => {
    setShowConfirmDialog(true);
    setConfirmMessage('Are you sure you want to delete this user?');
    setConfirmAction(() => () => executeDeleteUser(userId));
    setTargetUserId(userId); // Store user ID for context
  }, [executeDeleteUser]);

  const handleToggleUserStatus = useCallback((userId) => {
    setShowConfirmDialog(true);
    setConfirmMessage('Are you sure you want to toggle the status of this user?');
    setConfirmAction(() => () => executeToggleUserStatus(userId));
    setTargetUserId(userId); // Store user ID for context
  }, [executeToggleUserStatus]);

  // Handlers for confirmation dialog buttons
  const onConfirmAction = useCallback(() => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
    setTargetUserId(null);
  }, [confirmAction]);

  const onCancelAction = useCallback(() => {
    setShowConfirmDialog(false);
    setConfirmAction(null);
    setTargetUserId(null);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      authLogout();
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to logout. Please try again.';
      toast.error(errorMessage, toastConfig);
      console.error('Logout Error:', err);
    }
  }, [authLogout, navigate, toastConfig]);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
  }, []);

  const handleNavigation = useCallback((section) => {
    setActiveSection(section);
    if (section !== 'add-user') {
      setEditingUser(null);
      setAddUserError('');
    }
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingUser(null);
    setActiveSection('users');
    setAddUserError('');
  }, []);

  return (
    <div className="super-admin-dashboard">
      <aside className="sidebar">
        <div className="logo">Admin Panel</div>
        <nav className="main-nav">
          <ul>
            <li className={activeSection === 'overview' ? 'active' : ''}>
              <a href="#" onClick={() => handleNavigation('overview')}>Dashboard Overview</a>
            </li>
            <li className={activeSection === 'users' ? 'active' : ''}>
              <a href="#" onClick={() => handleNavigation('users')}>Manage Users</a>
            </li>
            <li className={activeSection === 'add-user' ? 'active' : ''}>
              <a href="#" onClick={() => handleNavigation('add-user')}>{editingUser ? 'Edit User' : 'Add User'}</a>
            </li>
            {/* Add more navigation items for Properties, Bookings, etc. */}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <h1>Super Admin Dashboard</h1>
          <div className="user-profile" onClick={toggleUserMenu}>
            <span>Welcome, Admin</span>
            {isUserMenuOpen && (
              <div className="user-menu">
                {/* <a href="#">Profile</a> */}
                <a href="#" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        </header>
        <section className="dashboard-section">
          {activeSection === 'overview' && (
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <DashboardOverview stats={stats} />
            </Suspense>
          )}
          {activeSection === 'users' && (
            <Suspense fallback={<div>Loading Users...</div>}>
              <UserList 
                users={users} 
                loading={loading} 
                error={error} 
                onEditUser={handleEditUser} 
                onDeleteUser={handleDeleteUser}
                onToggleUserStatus={handleToggleUserStatus}
              />
            </Suspense>
          )}
          {activeSection === 'add-user' && (
            <Suspense fallback={<div>Loading User Form...</div>}>
              <UserForm 
                onSubmit={handleAddUserSubmit} 
                onCancel={handleCancelEdit} 
                editingUser={editingUser} 
                loading={addUserLoading}
                error={addUserError}
              />
            </Suspense>
          )}
          {/* Render other sections based on activeSection */}
        </section>
      </main>
      {showConfirmDialog && (
        <ConfirmationDialog
          message={confirmMessage}
          onConfirm={onConfirmAction}
          onCancel={onCancelAction}
        />
      )}
    </div>
  );
}

export default SuperAdminDashboardPage;