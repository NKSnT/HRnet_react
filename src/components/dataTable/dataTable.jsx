import './dataTable.css';
//import Select from 'src/components/select/select';
import Select from 'src/components/select/select';
import TableFooter from './dataTable_footer';
import { /* useEffect, */ useEffect, useState /* , createContext */ } from 'react';
function DataTable(props) {
    const employees = props.data;
    //console.log(employees);
    const [entriesNumber, setEntriesNumber] = useState(10);
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
    const [page, setPage] = useState(1);
    const [data, setData] = useState(employees);
    //a déplacer ?
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
            <div>
                <div className="entriesNumber_Select">
                    Show
                    <Select
                        optionList={[10, 25, 50, 100]}
                        valueList={[10, 25, 50, 100]}
                        id="state"
                        onOptionChange={(elTarget) => {
                            //console.log(optionValue);
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
/* return (
    <>
        <div className="entriesNumber_Select">
            Show            
            <SelectV2
                optionList={[10, 25, 50, 100]}
                valueList={[10, 25, 50, 100]}
                id="state"
                onOptionChange={(optionValue) => {
                    //console.log(optionValue);
                    setEntriesNumber(optionValue);
                }}
                selectedOption={entriesNumber}
            />
            entries
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
                    {employees.map((employee, key) => {
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
            <div>
                <div>
                    Showing 1 to{' '}
                    {employees.length < entriesNumber ? employees.length : entriesNumber}
                    of {employees.length}
                </div>
                <div>{ lin to next page && previous page }1</div>
            </div>
        </div>
    </>
);
 */
