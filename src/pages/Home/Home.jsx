import { Link } from 'react-router-dom';

import States from 'src/assets/states';
import employeeDepartement from 'src/assets/employeeDepartement';
//import Select from 'src/components/select/select';

import Datepicker from 'src/components/datetimepicker/datePicker';
import { isDate, getDateISO } from 'src/components/datetimepicker/calendarAssets';

import Modal from 'src/components/modal/modal';
import { /* useEffect, */ useState /* , createContext */ } from 'react';

import Select from 'react-select-pckg';
//import Select from 'src/components/select/select';

function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedA, setSelectedA] = useState(0);

    const statesNames = States.map((state) => {
        return state.name;
    });
    const statesAbbreviation = States.map((state) => {
        return state.abbreviation;
    });
    function handleSubmit() {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const dateOfBirth = document.getElementById('date-of-birth').value;
        const startDate = document.getElementById('start-date').value;
        const department = document.getElementById('department').value;
        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zipCode = document.getElementById('zip-code').value;

        if (firstName && lastName && street && zipCode && city && dateOfBirth && startDate) {
            const birthDate = dateOfBirth.split(' ').join('').split('/').join('-');
            const dateOfStart = startDate.split(' ').join('').split('/').join('-');
            const isBirthDate = isDate(new Date(birthDate));
            const isDateOfStart = isDate(new Date(dateOfStart));
            if (isBirthDate && isDateOfStart) {
                console.log('yes2');
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                const employee = {
                    firstName: firstName,
                    lastName: lastName,
                    dateOfBirth: dateOfBirth, // YYYY / MM / DD format, take birthDate if date format needed
                    startDate: startDate, // like dateOfStart
                    //dateOfBirth: birthDate, // YYYY-MM-DD
                    //startDate: dateOfStart, //like birthDate
                    department: department,
                    street: street,
                    city: city,
                    state: state,
                    zipCode: zipCode
                };
                console.log(employee);
                employees.push(employee);
                localStorage.setItem('employees', JSON.stringify(employees));
                openModal();
            } else {
                alert('unknow date format');
            }
        } else {
            alert('empty field detected');
        }
    }
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/Employee-List" className="main-nav-logo">
                    View Current Employees
                </Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />
                    <Datepicker label="Date of Birth" id="date-of-birth" />
                    <Datepicker label="Start Date" id="start-date" />
                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />

                        <label htmlFor="state">State</label>
                        <Select
                            optionList={statesNames}
                            valueList={statesAbbreviation}
                            id="state"
                            onOptionChange={(elTarget) => {
                                elTarget.blur();
                            }}
                        />
                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>
                    <label htmlFor="department">Department</label>
                    <Select
                        optionList={employeeDepartement}
                        valueList={[]}
                        id="department"
                        onOptionChange={(elTarget) => {
                            elTarget.blur();
                        }}
                    />
                </form>
                <button onClick={handleSubmit}>Save</button>
            </div>
            <Modal modalOpen={modalOpen} /* modalContent={} */ onClose={closeModal} />
        </>
    );
}
export default Home;
