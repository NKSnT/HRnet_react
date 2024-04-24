import './dataTable.css';
import { useState, useEffect } from 'react';
const TableHeader = ({ columns, handleSorting }) => {
    const [sortField, setSortField] = useState('');
    const [order, setOrder] = useState('asc');
    const [defaultSorting, setDefaultSorting] = useState(true);

    const handleSortingChange = (accessor) => {
        const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    useEffect(() => {
        const defaufilterColumn = columns.filter((column) => column.sortbyOrder).pop();
        if (defaufilterColumn) {
            setSortField(defaufilterColumn.accessor);
            setOrder(defaufilterColumn.sortbyOrder);
            handleSorting(defaufilterColumn.accessor, defaufilterColumn.sortbyOrder);
        }
    }, []);

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    const cl = sortable
                        ? sortField === accessor && order === 'asc'
                            ? 'up'
                            : sortField === accessor && order === 'desc'
                              ? 'down'
                              : 'default'
                        : '';
                    return (
                        <th
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            className={cl}>
                            {label}
                            {/*  <button onClick={sortable ? () => handleSortingChange(accessor) : null}>
                                    {' '}
                                </button> */}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
