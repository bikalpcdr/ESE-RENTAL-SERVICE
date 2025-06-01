import React from 'react';

function UserList({ users, loading, error, handleEditUser, handleDeleteUser, handleToggleUserStatus }) {
  return (
    <section className="dashboard-section">
      <h3>View All Users</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber || '-'}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`action-button ${user.enabled ? 'deactivate' : 'activate'}`}
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.enabled ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UserList; 