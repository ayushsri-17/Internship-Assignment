import { useState, useEffect } from 'react';
import { UserFormData } from './types';
import './UserForm.css';

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  initialData?: UserFormData; // For edit mode
}

export default function UserForm({ onSubmit, onCancel, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    department: ''
  });

  // Initialize form with data when in edit mode

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
  
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        location: '',
        department: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim()) {
      alert('First name is required');
      return;
    }
    if (!formData.lastName.trim()) {
      alert('Last name is required');
      return;
    }
    if (!formData.email.trim()) {
      alert('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please enter a valid email');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Phone number is required');
      return;
    }

    if (!formData.role.trim()) {
      alert('Role is required');
      return;
    }
    if (!formData.location.trim()) {
      alert('Location is required');
      return;
    }
    if (!formData.department.trim()) {
      alert('Department is required');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialData ? 'Edit User' : 'Add New User'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Id"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {initialData ? 'Update User' : 'Add User'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}