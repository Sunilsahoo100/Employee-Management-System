import Swal from 'sweetalert2';
const projectId = process.env.REACT_APP_COSMOCLOUD_PROJECT_ID;
const environmentId = process.env.REACT_APP_COSMOCLOUD_ENVIRONMENT_ID;


function handleDelete(id, employees, setEmployees) {

  Swal.fire({
    icon: 'warning',
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  }).then(result => {
    if (result.value) {
      const myHeaders = {
        "Content-Type": "application/json",
        "projectId": projectId,
        "environmentId": environmentId,
      };
      const deleteEmployee = {
        id: id

    };

      fetch(`https://free-ap-south-1.cosmocloud.io/development/api/empdetails/${id}`, {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(deleteEmployee),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setEmployees(employees.filter(employee => employee._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `Employee's data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error("Error:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete employee. Please try again.',
          showConfirmButton: true,
        });
      });
    }
  });
}

export default handleDelete;
