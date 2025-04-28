import { useState,useEffect } from 'react';
import UserForm from './UserForm';
import { User } from './types';
import './App.css';

export default function Users() {

  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchUser, setSearchUser] = useState('');
  const [filteredUsers, setFilteredUser] = useState<User[]>(users);;

  useEffect(() => {
    if (searchUser.trim() === '') {
      setFilteredUser(users);
    }
  }, [users, searchUser]);  

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

const handleSearch = (type:string)=>{
  setSearchUser(type);
  if(!type){
    setFilteredUser(users);
    return
  }
  const results = users.filter(user=>(
    user.email.toLowerCase().includes(type.toLowerCase())
  ))
  setFilteredUser(results);
}


  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (toDelete: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== toDelete));
  };
  

  return (
    <div className="app-container">
      <h1 className="app-title">Manage Users</h1>
      
    <input className='searchbar' 
      type='search' placeholder='Search for Email'
      value={searchUser} onChange={(e)=>handleSearch(e.target.value)}></input>

   

    
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

            {filteredUsers.length === 0 ? (
                <p className="no-users-message">
                  {users.length === 0 ? "No users added yet" : "No match found"}
                </p>
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
                  <th>Actions</th> {/* Added for the Edit button */}
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
               <button className="edit-btn"onClick={() => handleEdit(user)}>
              Edit</button>
                </td>
                    <td>
               <button className="del-btn"onClick={() => handleDelete(user.id)}>
              Delete</button>
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