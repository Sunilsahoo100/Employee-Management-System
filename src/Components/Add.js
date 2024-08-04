import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

const projectId = process.env.REACT_APP_COSMOCLOUD_PROJECT_ID;
const environmentId = process.env.REACT_APP_COSMOCLOUD_ENVIRONMENT_ID;

function Add({ employees, setEmployees, setIsAdding }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const textInput = useRef(null);


  useEffect(() => {
    textInput.current.focus();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!fullName || !email || !address || !phone) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      fullName,
      address,
      email,
      phone,
    };

    const myHeaders = {
      "Content-Type": "application/json",
      "projectId": projectId,
      "environmentId": environmentId,
    };

    fetch("https://free-ap-south-1.cosmocloud.io/development/api/empdetails", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        const addedEmployee = { ...newEmployee, _id: data.id };
        setEmployees([...employees, addedEmployee]);

        Swal.fire({
          icon: "success",
          title: "Added!",
          text: `${fullName}'s data has been added.`,
          showConfirmButton: false,
          timer: 1500,
        });

        setFullName("");
        setEmail("");
        setAddress("");
        setPhone("");

        setIsAdding(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add employee. Please try again.",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          ref={textInput}
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
