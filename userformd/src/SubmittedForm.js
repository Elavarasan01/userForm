import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubmittedForms() {
  const [submittedForms, setSubmittedForms] = useState([]);

  useEffect(() => {
    const fetchSubmittedForms = async () => {
      try {
        const response = await axios.get('http://localhost:2000/submitted-forms');
        setSubmittedForms(response.data);
      } catch (error) {
        console.error('Error fetching submitted forms:', error);
      }
    };

    fetchSubmittedForms();
  }, []);

  return (
    <div>
      <h1>Submitted Forms</h1>
      <ul>
        {submittedForms.map((formData, index) => (
          <li key={index}>
            Name: {formData.name}, Email: {formData.email}, Phone: {formData.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmittedForms;