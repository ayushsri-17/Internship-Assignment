import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom"; 

const AddEdit: React.FC = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    location: "",
  });

  const navigate = useNavigate();
  const{index} = useParams();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
  useEffect(() => {
    if (index!==undefined) {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const editedUser = existingUsers[parseInt(index)]; 
      if (editedUser) {
        setUserData(editedUser);
      }
    }
  }, [index]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!userData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!userData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!userData.phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    }
    if (!userData.role.trim()) {
      newErrors.role = "Role is required";
      isValid = false;
    }
    if (!userData.department.trim()) {
      newErrors.department = "Department is required";
      isValid = false;
    }
    if (!userData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev,[name]: value,})
   );
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (index){
        const updatedUsers = [...existingUsers]
        updatedUsers[parseInt(index)] =userData;
        localStorage.setItem('users', JSON.stringify(updatedUsers)); 
      }else{
      const updatedUsers = [...existingUsers, userData];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      }
      navigate('/');

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        location: "",
      });
    } else {
      console.log('Form has errors:', errors);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">FIRST NAME *</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">LAST NAME *</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL ID *</label>
          <input
            type="email"
            name="email"
            placeholder="Email Id"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">PHONE *</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="role">ROLE *</label>
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={userData.role}
            onChange={handleChange}
          />
          {errors.role && <p className="error">{errors.role}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="department">DEPARTMENT *</label>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={userData.department}
            onChange={handleChange}
          />
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location">LOCATION *</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={userData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <button type="submit" className="add-btn">Add User</button>
      </form>
    </div>
  );
};

export default AddEdit;
