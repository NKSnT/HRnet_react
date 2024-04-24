const TableBody = ({ tableData, columns }) => {
    return (
        <tbody>
            {tableData.map((data, key) => {
                return (
                    <tr key={key}>
                        {columns.map(({ accessor }) => {
                            const tData = data[accessor] ? data[accessor] : '——';
                            return <td key={accessor}>{tData}</td>;
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};
export default TableBody;
