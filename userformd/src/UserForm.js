import { useState } from 'react';
import axios from 'axios';

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
  
    try {
      const formDataCopy = { ...formData };
      await axios.post('http://localhost:2000/submit-form', formDataCopy);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred while submitting the form');
    }
  };
  
  

  return (
    <div className="form-container"> 
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <label className="form-label">
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <label className="form-label">
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" required />
        </label>
        <br />
        <button type="submit" className="form-submit">Submit</button>
      </form>
    </div>
  );
};
