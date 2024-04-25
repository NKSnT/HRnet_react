import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/Home/Home';
import EmployeeList from '@pages/Employee-List/Employee-List';

import { /* createContext, */ useState, useEffect } from 'react';
import { DataContext } from './Contexts.js';
function App() {
    const [data, setData] = useState();
    useEffect(() => {
        localStorage.getItem('employees') != (null || 'undefined')
            ? setData(JSON.parse(localStorage.getItem('employees')))
            : '';
    }, []);
    useEffect(() => {
        data
            ? data != JSON.parse(localStorage.getItem('employees'))
                ? localStorage.setItem('employees', JSON.stringify(data))
                : ''
            : '';
    }, [data, setData]);

    return (
        <>
            <DataContext.Provider value={{ data, setData }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Employee-List" element={<EmployeeList />} />
                    </Routes>
                </Router>
            </DataContext.Provider>
        </>
    );
}

export default App;
