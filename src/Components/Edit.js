import React, { useState } from 'react';
import Swal from 'sweetalert2';
const projectId = process.env.REACT_APP_COSMOCLOUD_PROJECT_ID;
const environmentId = process.env.REACT_APP_COSMOCLOUD_ENVIRONMENT_ID;

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {

    const id = selectedEmployee._id;

    const [fullName, setFullName] = useState(selectedEmployee.fullName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [address, setAddress] = useState(selectedEmployee.address);
    const [phone, setPhone] = useState(selectedEmployee.phone);

    const handleUpdate = e => {
        e.preventDefault();

        if (!fullName || !email || !address || !phone) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const updatedEmployee = {
            _id: id,
            "fullName":fullName,
            "address":address,
            "email":email,
            "phone":phone
        };

        const myHeaders = {
            "Content-Type": "application/json",
            "projectId": projectId,
            "environmentId": environmentId,
          };


        fetch(`https://free-ap-south-1.cosmocloud.io/development/api/empdetails/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(updatedEmployee),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);


            const updatedEmployees = employees.map(emp => emp._id === id ? updatedEmployee : emp);
            setEmployees(updatedEmployees);
            setIsEditing(false);

            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: `${fullName}'s data has been updated.`,
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch((error) => {
            console.log(error);
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update employee. Please try again.',
                showConfirmButton: true
            });
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    name="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit;
