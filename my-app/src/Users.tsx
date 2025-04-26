import { useState } from 'react';
import UserForm from './UserForm';
import { User } from './types';
import './App.css';

export default function Users() {

  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (newUserData: Omit<User, 'id'>) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...newUserData, id: editingUser.id } : user
      ));
      setEditingUser(null);
    } else {
      // Add new user
      const newUser = {
        id: Date.now(),
        ...newUserData
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Manage Users</h1>
      
      {showForm ? (
        <UserForm 
          onSubmit={handleAddUser}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          initialData={editingUser || undefined}
        />
      ) : (
        <>
          <button 
            className="add-user-btn"
            onClick={() => setShowForm(true)}
          >
            Add User
          </button>
          
          <div className="users-list-container">
            <h2 className="users-title">Users List</h2>
            {users.length === 0 ? (
              <p className="no-users-message">No users added yet</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Role</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.location}</td>
                      <td>{user.role}</td>
                      <td>{user.department}</td>
          
                      <td>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}