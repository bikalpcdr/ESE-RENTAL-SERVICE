import React, { useState, useEffect } from 'react';
import '../../styles/SuperAdminDashboard.css';
import { api } from '../../api'; // Import the configured axios instance
import { toast } from 'react-toastify'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Import new components
import DashboardOverview from '../../components/admin/DashboardOverview';
import UserList from '../../components/admin/UserList';
import UserForm from '../../components/admin/UserForm';

function SuperAdminDashboard() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State to manage user menu visibility
  const [activeSection, setActiveSection] = useState('overview'); // State to track active section
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
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    role: '' // Default role changed to empty string for placeholder
  });
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  // Fetch users and stats when component mounts
  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/users');
      const { status, message, data } = response.data;
      if (status) {
        setUsers(data);
        toast.success(message, toastConfig);
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
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/users');
      const { status, message, data } = response.data;
      
      if (status) {
        setStats({
          totalUsers: data.length,
          totalProperties: 0, // TODO: Add property count
          totalBookings: 0, // TODO: Add booking count
          activeBookings: 0, // TODO: Add active booking count
          recentUsers: data.slice(0, 5), // Show last 5 users
          recentBookings: [] // TODO: Add recent bookings
        });
        toast.success(message, toastConfig);
      } else {
        console.error('Failed to fetch stats:', message);
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch stats';
      console.error('Failed to fetch stats:', err);
      toast.error(errorMessage, toastConfig);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      id: user.id,
      username: user.username,
      email: user.email,
      password: '', // Don't show password when editing
      fullName: user.fullName,
      phoneNumber: user.phoneNumber || '',
      role: user.role
    });
    setActiveSection('add-user'); // Switch to form view
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await api.delete(`/users/${userId}`);
      const { status, message } = response.data;
      if (status) {
        toast.success(message, toastConfig);
        await fetchUsers();
      } else {
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage, toastConfig);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await api.post('/auth/logout');
      const { status, message } = response.data;
      if (status) {
        toast.success(message, toastConfig);
        setTimeout(() => {
          navigate('/');
        }, 300);
      } else {
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to logout. Please try again.';
      toast.error(errorMessage, toastConfig);
      console.error('Logout Error:', err);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    if (!window.confirm('Are you sure you want to toggle the status of this user?')) {
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(`/users/toggle-status/${userId}`);
      const { status, message } = response.data;
      if (status) {
        toast.success(message, toastConfig);
        await fetchUsers();
      } else {
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to toggle user status';
      toast.error(errorMessage, toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    if (section !== 'add-user') {
      setEditingUser(null);
      setNewUser({
        username: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        role: ''
      });
    }
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    setAddUserError('');

    if (!newUser.role) {
      setAddUserError('Please select a user role.');
      toast.error('Please select a user role.', toastConfig);
      setAddUserLoading(false);
      return;
    }

    try {
      let response;
      if (editingUser) {
        // For update, create a copy without password if it's empty
        const updateData = { ...newUser };
        if (!updateData.password) {
          delete updateData.password;
        }
        response = await api.post('/users/update', updateData);
      } else {
        // Create new user
        response = await api.post('/users/create', newUser);
      }

      const { status, message, data } = response.data;
      if (status) {
        toast.success(message, toastConfig);
        setNewUser({
          username: '',
          email: '',
          password: '',
          fullName: '',
          phoneNumber: '',
          role: ''
        });
        setEditingUser(null);
        await fetchUsers();
        setActiveSection('view-users');
      } else {
        toast.error(message, toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save user. Please try again.';
      setAddUserError(errorMessage);
      toast.error(errorMessage, toastConfig);
    } finally {
      setAddUserLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewUser({
      username: '',
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      role: ''
    });
    setActiveSection('view-users');
  };

  return (
    <div className="superadmin-dashboard-container">
      <h2>Superadmin Dashboard</h2>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <h3>Super Admin Menu</h3>
          <nav>
            <ul>
              <li><a href="#" onClick={() => handleNavigation('overview')}>Dashboard Overview</a></li>
              <li>
                <div className="sidebar-menu-item" onClick={toggleUserMenu}>
                  <a href="#user-management">User Management</a>
                  <span className={`menu-toggle-icon ${isUserMenuOpen ? 'open' : ''}`}>▼</span>
                </div>
                <ul className={`sidebar-submenu ${isUserMenuOpen ? 'open' : ''}`}>
                  <li><a href="#" onClick={() => handleNavigation('view-users')}>View All Users</a></li>
                  <li><a href="#" onClick={() => handleNavigation('add-user')}>Add New User</a></li>
                </ul>
              </li>
              <li><a href="#" onClick={() => handleNavigation('property-management')}>Property Management</a></li>
              <li><a href="#" onClick={() => handleNavigation('booking-management')}>Booking Management</a></li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        <main className="dashboard-main-content">
          {activeSection === 'overview' && <DashboardOverview stats={stats} />}

          {activeSection === 'view-users' && (
            <UserList 
              users={users} 
              loading={loading} 
              error={error} 
              handleEditUser={handleEditUser} 
              handleDeleteUser={handleDeleteUser} 
              handleToggleUserStatus={handleToggleUserStatus}
            />
          )}

          {activeSection === 'add-user' && (
            <UserForm
              editingUser={editingUser}
              newUser={newUser}
              handleNewUserInputChange={handleNewUserInputChange}
              handleAddUserSubmit={handleAddUserSubmit}
              addUserLoading={addUserLoading}
              addUserError={addUserError}
              handleCancelEdit={handleCancelEdit}
            />
          )}

          {activeSection === 'property-management' && (
          <section className="dashboard-section">
            <h3>Property Management Content</h3>
            <p>Content and features for managing properties will coming soon.!!</p>
          </section>
          )}

          {activeSection === 'booking-management' && (
          <section className="dashboard-section">
            <h3>Booking Management Content</h3>
            <p>Content and features for managing bookings will coming soon.!!</p>
          </section>
          )}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SuperAdminDashboard; 