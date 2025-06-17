import React from 'react';
import '../../styles/superadmin/UserList.css';

function UserList({ users, loading, error, onEditUser, onDeleteUser, onToggleUserStatus }) {
    if (loading) {
        return <div className="user-list-message">Loading users...</div>;
    }

    if (error) {
        return <div className="user-list-error">Error: {error}</div>;
    }

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">User List</h2>
            {users.length === 0 ? (
                <div className="user-list-message">No users found.</div>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span className={`user-status ${user.enabled ? 'active' : 'inactive'}`}>
                                        {user.enabled ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="user-actions">
                                    <button onClick={() => onEditUser(user)} className="action-btn edit-btn">Edit</button>
                                    <button onClick={() => onDeleteUser(user.id)} className="action-btn delete-btn">Delete</button>
                                    <button 
                                        onClick={() => onToggleUserStatus(user.id)} 
                                        className={`action-btn toggle-status-btn ${user.enabled ? 'disable-btn' : 'enable-btn'}`}
                                    >
                                        {user.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserList; 