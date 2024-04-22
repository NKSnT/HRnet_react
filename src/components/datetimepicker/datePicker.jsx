import { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import Calendar from './calendar';
import { isDate, getDateISO } from './calendarAssets';
import './datePicker.css';
//import Logo from 'src/assets/calenda_ico.svg';

export default function Datepicker(props) {
    const [dateState, setDateState] = useState(null);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const reg =
        /^(\d{0,4}?|(\d{0,4} )|(\d{0,4} \/)|(\d{0,4} \/ )|(\d{0,4} \/ \d)|(\d{0,4} \/ \d{2})|(\d{0,4} \/ \d{2} )|(\d{0,4} \/ \d{2} \/)|(\d{0,4} \/ \d{2} \/ )|(\d{0,4} \/ \d{2} \/ \d)|(\d{0,4} \/ \d{2} \/ \d{2}))$/;
    // only allow YYYY / MM / DD date format and it's "inWritting' variant (ex: YYYY / M)

    const handleChange = (evt) => {
        evt.preventDefault();
        let inputValue = evt.target.value;

        if (evt.target.value.length == 4 || evt.target.value.length == 9) {
            //auto séparator with /
            inputValue = inputValue + ' / ';
        }
        if (evt.target.value.length == 6) {
            //case if user want to redo start number
            inputValue = '';
        }
        if (evt.target.value.length == 11) {
            //case if user want to redo midle number
            inputValue = inputValue.slice(0, -4);
        }
        if (evt.target.value.length == 14) {
            //end of user input, save and blurOut
            setCalendarOpen(false);
            evt.target.blur();
        }
        if (reg.test(inputValue)) {
            setDateState(inputValue);
        }
    };
    const handleDateChange = (date) => {
        const newDate = date ? getDateISO(date) : null;
        if (dateState !== newDate) {
            setDateState(newDate);
            setCalendarOpen(false);
        }
    };
    const handleOpenCalendar = () => {
        if (!calendarOpen) {
            setCalendarOpen(true);
        }
    };
    useEffect(() => {
        const newDate = props.value && new Date(props.value);
        isDate(newDate) && setDateState(getDateISO(newDate));
    }, [props]);
    useEffect(() => {
        const dateISO = getDateISO(new Date(props.value));
        setDateState(dateISO);
    }, [props]);

    return (
        <>
            <OutsideClickHandler
                onOutsideClick={() => {
                    //alert('You clicked outside of this component!!!');
                    setCalendarOpen(false);
                }}>
                <label htmlFor={props.id}>{props.label || 'Enter Date'}</label>
                <div className="DatePicker">
                    <input
                        id={props.id}
                        type="text"
                        value={dateState ? dateState.split('-').join(' / ') : ''}
                        onChange={handleChange}
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        placeholder="YYYY / MM / DD"
                    />
                    <input type="button" onClick={handleOpenCalendar} />
                </div>
                {calendarOpen && (
                    <Calendar
                        date={dateState && new Date(dateState)}
                        onDateChanged={handleDateChange}
                    />
                )}
            </OutsideClickHandler>
        </>
    );
}
