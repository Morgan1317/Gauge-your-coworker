async function newEmployee(event) {
    event.preventDefault();

    // get needed data for employee
    const employee_name = document.querySelector('#employee-name').value; 
    const work_name = document.querySelector('#work-name').value; 
    const position = document.querySelector('#position').value;

    const response = await fetch(`/api/employees`, {
        method: 'POST',
        body: JSON.stringify({
            employee_name,
            work_name,
            position,
            
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}; 

document.querySelector('.new-employee-form').addEventListener('submit', newEmployee);
