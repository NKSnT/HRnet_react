import { Link } from 'react-router-dom';

import Table from 'src/components/dataTable/dataTable';
function EmployeeList() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    //console.log(employees);
    const clearLocalS = () => {
        localStorage.removeItem('employees');
        location.reload();
    };
    return (
        <>
            <div id="employee-div" className="container">
                <h1>Current Employees</h1>
                <button onClick={clearLocalS}>Clear local storage</button>
                <Table data={employees} />
                <Link to="/" className="main-nav-logo">
                    Home
                </Link>
            </div>
        </>
    );
}
export default EmployeeList;
