import React from 'react';

function UserForm({
  editingUser,
  newUser,
  handleNewUserInputChange,
  handleAddUserSubmit,
  addUserLoading,
  addUserError,
  handleCancelEdit
}) {
  return (
    <section className="dashboard-section">
      <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
      <div className="add-user-form-container">
        <form onSubmit={handleAddUserSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={newUser.username}
              onChange={handleNewUserInputChange}
              required
              disabled={editingUser}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={newUser.fullName}
              onChange={handleNewUserInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleNewUserInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={newUser.phoneNumber}
              onChange={handleNewUserInputChange}
              pattern="^(\+977)?[9][7-8]\d{8}$"
              placeholder="98XXXXXXXX or +97798XXXXXXXX"
              title="Please enter a valid Nepali phone number starting with 97 or 98"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleNewUserInputChange}
              required={!editingUser}
              placeholder={editingUser ? "Leave blank to keep current password" : ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleNewUserInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="LANDLORD">Landlord</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" disabled={addUserLoading}>
              {addUserLoading ? 'Saving...' : (editingUser ? 'Update User' : 'Add User')}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
          {addUserError && <div className="error-message">{addUserError}</div>}
        </form>
      </div>
    </section>
  );
}

export default UserForm; 