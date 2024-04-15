import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '@pages/Home/Home';
import EmployeeList from '@pages/Employee-List/Employee-List';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Employee-List" element={<EmployeeList />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
