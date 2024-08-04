import React from "react";
import Swal from "sweetalert2";


function List({ employees, handleEdit, handleDelete }) {
  const handleDetails = (employee) => {
    Swal.fire({
      title: employee.fullName,
      html: `
        <p><strong>Employee ID:</strong> ${employee._id}</p>
        <p><strong>Address:</strong> ${employee.address}</p>
        <p><strong>Email:</strong> ${employee.email}</p>
        <p><strong>Phone:</strong> ${employee.phone}</p>
      `,
      showCloseButton: true,
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee._id}</td>
                <td>{employee.fullName}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleDetails(employee)}
                    className="button blue-button"
                  >
                    Details
                  </button>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="button yellow-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="button red-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
