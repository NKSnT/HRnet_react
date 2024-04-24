import { Link } from 'react-router-dom';

import Table from 'src/components/dataTable/dataTable';
import { DataContext } from 'src/app/Contexts.js';
import { useContext } from 'react';

function EmployeeList() {
    //const employees = JSON.parse(localStorage.getItem('employees')) || [];
    //console.log(employees);
    const { data, setData } = useContext(DataContext);
    //console.log(data);
    const clearLocalS = () => {
        localStorage.removeItem('employees');
        location.reload();
    };

    return (
        <>
            <div id="employee-div" className="container">
                <h1>Current Employees</h1>
                <button onClick={clearLocalS}>Clear local storage</button>
                {data ? <Table data={data} /> : <Table data={[]} />}
                <Link to="/" className="main-nav-logo">
                    Home
                </Link>
            </div>
        </>
    );
}
export default EmployeeList;
