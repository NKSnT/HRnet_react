import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/Home/Home';
import EmployeeList from '@pages/Employee-List/Employee-List';

import { /* createContext, */ useState, useEffect } from 'react';
import { DataContext } from './Contexts.js';
function App() {
    const [data, setData] = useState();
    useEffect(() => {
        //localStorage.removeItem('employees');
        //console.log(localStorage.getItem('employees'));
        /*  const employees = localStorage.getItem('employees')
            ? JSON.parse(localStorage.getItem('employees'))
            : [];
        setData(employees); */
        //console.log(localStorage.getItem('employees'));
        localStorage.getItem('employees') != (null || 'undefined')
            ? setData(JSON.parse(localStorage.getItem('employees')))
            : console.log('data was not set');
    }, []);
    useEffect(() => {
        console.log('data : ');
        console.log(data);
        console.log('local storage : ');
        console.log(localStorage.getItem('employees'));
        data
            ? data != JSON.parse(localStorage.getItem('employees'))
                ? localStorage.setItem('employees', JSON.stringify(data))
                : console.log('do nothing')
            : console.log('do nothing tout cours');

        /*  const datatest = data;
        datatest && datatest.length != 0 ? console.log('add item') : console.log('do nothing');
        localStorage.setItem('employees', JSON.stringify(data)); */

        //console.log(JSON.parse(localStorage.getItem('employees')));
        //localStorage.setItem('employees', JSON.stringify(data));
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
