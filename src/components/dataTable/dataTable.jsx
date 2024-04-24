import './dataTable.css';
import { useEffect, useState } from 'react';
import Select from 'react-select-pckg';

import TableBody from './dataTable_body';
import TableHeader from './dataTable_header';
import TableFooter from './dataTable_footer';

import { useSortableTable } from './tableSorting_assets';

function DataTable(props) {
    //const employees = props.data;

    const [tableData, handleSorting, setData] = useSortableTable(props.data); //access to the store after dev
    const [entriesNumber, setEntriesNumber] = useState(10);
    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
    const [page, setPage] = useState(1);

    const columns = [
        { label: 'First Name', accessor: 'firstName', sortable: true, sortbyOrder: 'desc' },
        { label: 'Last Name', accessor: 'lastName', sortable: true },
        { label: 'Start Date', accessor: 'startDate', sortable: true },
        { label: 'Departement', accessor: 'department', sortable: true },
        { label: 'Date of Birth', accessor: 'dateOfBirth', sortable: true },
        { label: 'Street', accessor: 'street', sortable: true },
        { label: 'City', accessor: 'city', sortable: true },
        { label: 'State', accessor: 'state', sortable: true },
        { label: 'Zip Code', accessor: 'zipCode', sortable: true }
    ];
    useEffect(() => {
        const range = calculateRange(tableData, entriesNumber);
        setTableRange([...range]);

        const slice = sliceData(tableData, page, entriesNumber);
        setSlice([...slice]);
    }, [tableData, entriesNumber, page]);
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
        tableData.map((item) => {
            Object.values(item).filter((el) => {
                if (el.toLowerCase().includes(inputValue.toLowerCase())) {
                    if (!filteredData.includes(item)) {
                        filteredData.push(item);
                    }
                }
            });
        });
        setSlice(filteredData);
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
                <table className="table">
                    <caption>Employee currently enrolled, column headers are sortable.</caption>
                    <TableHeader columns={columns} handleSorting={handleSorting} />
                    {/* <TableHead {...{ columns, handleSorting }} /> same as above*/}
                    <TableBody columns={columns} tableData={slice} />
                </table>
                <div className="tableFooter_wrapper">
                    <div>
                        show {page == 1 ? 1 : page * entriesNumber + 1} to {slice.length} of{' '}
                        {tableData.length} entries
                    </div>
                    <TableFooter
                        range={tableRange}
                        setPage={setPage}
                        page={page}
                        entriesNumber={entriesNumber}
                    />
                </div>
            </div>
        </>
    );
}

export default DataTable;
