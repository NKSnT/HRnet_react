import { Link } from 'react-router-dom';

import Table from 'src/components/dataTable/dataTable';
import { DataContext } from 'src/app/Contexts.js';
import { useContext } from 'react';

function EmployeeList() {
    const { data, setData } = useContext(DataContext);

    return (
        <>
            <div id="employee-div" className="container">
                <h1>Current Employees</h1>

                {data ? <Table data={data} /> : <Table data={[]} />}
                <Link to="/" className="main-nav-logo">
                    Home
                </Link>
            </div>
        </>
    );
}
export default EmployeeList;
