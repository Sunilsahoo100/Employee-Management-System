import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import handleDelete from './Delete';
const projectId = process.env.REACT_APP_COSMOCLOUD_PROJECT_ID;
const environmentId = process.env.REACT_APP_COSMOCLOUD_ENVIRONMENT_ID;


function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  

  const handleEdit = (id) => {
    const employee = employees.find(employee => employee._id === id);

    if (!employee) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No employee selected for editing.',
        showConfirmButton: true
      });
      return;
    }

    setSelectedEmployee(employee);
    setIsEditing(true);
  };
   const fetchEmployees = async () => {
    try {
      const myHeaders = {
        "Content-Type": "application/json",
        "projectId": projectId,
        "environmentId": environmentId,
      };

      const limit = 100;
      const offset = 0;

      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/empdetails?limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result && result.data) {
        setEmployees(result.data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []); 

  const filteredEmployees = employees.filter(employee =>
    employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee._id.includes(searchQuery)
  );

  return (
    
    <div className='container'>
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <List
            employees={filteredEmployees}
            handleEdit={handleEdit}
            handleDelete={(id) => handleDelete(id, employees, setEmployees)}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          error={error}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && selectedEmployee && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Dashboard;
