import { AddCircle } from "@mui/icons-material";
import { EditNote } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [searchUser, setSearchUser] = useState("");

  const handleAddUser = () => {
    navigate("/add-user");
  };
  
  const handleEditUser = (index : number)=>{
    navigate(`/edit-user/${index}`);
  }
  
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []); 


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  


  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div>
      <div className="User-container">
        <h1 style={{ color: "green"  }}>Manage Users</h1>
        <input
          type="email"
          placeholder="Search for Email"
          value={searchUser}
          onChange={handleSearch}
        />
        <button className="add-btn" onClick={handleAddUser}>
          <AddCircle /> Add
        </button>
     

        <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Department</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>{user.location}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditUser(index)}>
                     <EditNote/> Edit User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
   </div>
</div>
  );
};

export default Users;
