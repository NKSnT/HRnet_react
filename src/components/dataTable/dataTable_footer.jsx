//import styles from './TableFooter.module.css';

const TableFooter = ({ range, setPage, page }) => {
    //not tested but should work
    //if big number of page, use this version, to only display n page and navigate with previous/next btn
    return (
        <>
            <div>
                <button
                    onClick={() => {
                        page < range ? setPage(page + 1) : '';
                    }}>
                    Previous
                </button>
                {range.slice(page - 2, page + 2).map((el, index) => (
                    <button key={index} onClick={() => setPage(el)}>
                        {el}
                    </button>
                ))}
                <button
                    onClick={() => {
                        page > 1 ? setPage(page - 1) : '';
                    }}>
                    Next
                </button>
            </div>
        </>
    );
};

export default TableFooter;
