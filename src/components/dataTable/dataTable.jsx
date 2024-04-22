import './dataTable.css';
import Select from 'react-select-pckg';
//import Select from 'src/components/select/select';

import TableFooter from './dataTable_footer';
import { /* useEffect, */ useEffect, useState /* , createContext */ } from 'react';
function DataTable(props) {
    const employees = props.data;

    const [entriesNumber, setEntriesNumber] = useState(10);
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(employees);
    useEffect(() => {
        const range = calculateRange(data, entriesNumber);
        setTableRange([...range]);

        const slice = sliceData(data, page, entriesNumber);
        setSlice([...slice]);
    }, [data, entriesNumber]);
    function calculateRange(data, rowsPerPage) {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        return range;
    }
    function sliceData(data, page, rowsPerPage) {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    }
    const handleSearch = (evt) => {
        //filter employees list with research keyword
        evt.preventDefault();
        let inputValue = evt.target.value;
        let filteredData = [];
        employees.map((item) => {
            Object.values(item).filter((el) => {
                if (el.toLowerCase().includes(inputValue.toLowerCase())) {
                    if (!filteredData.includes(item)) {
                        filteredData.push(item);
                    }
                }
            });
        });
        setData(filteredData);
    };
    return (
        <>
            <div className="table_header">
                <div className="entriesNumber_Select">
                    Show
                    <Select
                        optionList={[10, 25, 50, 100]}
                        valueList={[10, 25, 50, 100]}
                        id="state"
                        onOptionChange={(elTarget) => {
                            setEntriesNumber(elTarget.value);
                            elTarget.blur();
                        }}
                        selectedOption={entriesNumber}
                    />
                    entries
                </div>
                <div>
                    <label htmlFor="search">Search:</label>
                    <input type="text" id="search" onChange={handleSearch} />
                </div>
            </div>

            <div className="table_wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Start Date</th>
                            <th>Departement</th>
                            <th>Date of Birth</th>
                            <th>Street</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slice.map((employee, key) => {
                            return (
                                <tr key={key}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.startDate}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.dateOfBirth}</td>
                                    <td>{employee.street}</td>
                                    <td>{employee.city}</td>
                                    <td>{employee.state}</td>
                                    <td>{employee.zipCode}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <TableFooter range={tableRange} slice={slice} setPage={setPage} page={page} />
            </div>
        </>
    );
}

export default DataTable;
