import { /* React, */ /* Component, */ Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './calendarStyle.js';
import calendar, {
    isDate,
    isSameDay,
    isSameMonth,
    getDateISO,
    getNextMonth,
    getPreviousMonth,
    WEEK_DAYS_EN,
    CALENDAR_MONTHS_EN
} from './calendarAssets';
export default function Calendar({ date, onDateChanged }) {
    const [dateState, setDateState] = useState({ current: 1, month: 1, year: 1 });
    const [today, setToday] = useState(new Date());

    useEffect(() => {
        addDateToState(date);
    }, [date]);

    const addDateToState = (date) => {
        const isDateObject = isDate(date);
        const _date = isDateObject ? date : new Date();
        setDateState({
            current: isDateObject ? date : null,
            month: +_date.getMonth() + 1,
            year: _date.getFullYear()
        });
    };
    const getCalendarDates = () => {
        const { current, month, year } = dateState;
        const calendarMonth = month || +current.getMonth() + 1;
        const calendarYear = year || current.getFullYear();
        return calendar(calendarMonth, calendarYear);
    };
    //----handler
    const gotoDate = (date) => (evt) => {
        evt && evt.preventDefault();
        const { current } = dateState;
        !(current && isSameDay(date, current)) && addDateToState(date);
        onDateChanged(date);
    };
    const gotoPreviousMonth = () => {
        const { month, year } = dateState;
        const previousMonth = getPreviousMonth(month, year);
        setDateState({
            month: previousMonth.month,
            year: previousMonth.year,
            current: dateState.current
        });
    };
    const gotoNextMonth = () => {
        const { month, year } = dateState;
        const nextMonth = getNextMonth(month, year);
        setDateState({
            month: nextMonth.month,
            year: nextMonth.year,
            current: dateState.current
        });
    };
    const gotoPreviousYear = () => {
        const { year } = dateState;
        setDateState({
            month: dateState.month,
            year: year - 1,
            current: dateState.current
        });
    };
    const gotoNextYear = () => {
        const { year } = dateState;
        setDateState({
            month: dateState.month,
            year: year + 1,
            current: dateState.current
        });
    };
    const handlePressure = (fn) => {
        if (typeof fn === 'function') {
            fn();
            pressureTimeout = setTimeout(() => {
                pressureTimer = setInterval(fn, 100);
            }, 500);
        }
    };
    const clearPressureTimer = () => {
        pressureTimer && clearInterval(pressureTimer);
        pressureTimeout && clearTimeout(pressureTimeout);
    };
    const handlePrevious = (evt) => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? gotoPreviousYear : gotoPreviousMonth;
        handlePressure(fn);
    };
    const handleNext = (evt) => {
        evt && evt.preventDefault();
        const fn = evt.shiftKey ? gotoNextYear : gotoNextMonth;
        handlePressure(fn);
    };
    //----other
    let pressureTimer, pressureTimeout;
    const renderMonthAndYear = () => {
        const { month, year } = dateState;
        // Resolve the month name from the CALENDAR_MONTHS object map
        const monthname = Object.keys(CALENDAR_MONTHS_EN)[Math.max(0, Math.min(month - 1, 11))];
        return (
            <Styled.CalendarHeader>
                <Styled.ArrowLeft
                    onMouseDown={handlePrevious}
                    onMouseUp={clearPressureTimer}
                    title="Previous Month"
                />
                <Styled.CalendarMonth>
                    {monthname} {year}
                </Styled.CalendarMonth>
                <Styled.ArrowRight
                    onMouseDown={handleNext}
                    onMouseUp={clearPressureTimer}
                    title="Next Month"
                />
            </Styled.CalendarHeader>
        );
    };
    // Render the label for day of the week
    // This method is used as a map callback as seen in render()
    const renderDayLabel = (day, index) => {
        // Resolve the day of the week label from the WEEK_DAYS object map
        const daylabel = WEEK_DAYS_EN[day].toUpperCase();
        return (
            <Styled.CalendarDay key={daylabel} index={index}>
                {daylabel}
            </Styled.CalendarDay>
        );
    };
    // Render a calendar date as returned from the calendar builder function
    // This method is used as a map callback as seen in render()
    const renderCalendarDate = (date, index) => {
        const { current, month, year } = dateState;
        const _date = new Date(date.join('-'));
        // Check if calendar date is same day as today
        const isToday = isSameDay(_date, today);
        // Check if calendar date is same day as currently selected date
        const isCurrent = current && isSameDay(_date, current);
        // Check if calendar date is in the same month as the state month and year
        const inMonth = month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));
        //const inmonth = month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));
        // The click handler

        //const onClick = this.gotoDate(_date); does not work
        const onClick = gotoDate(_date);

        const props = { index, inMonth, onClick, title: _date.toDateString() };
        //const props = { index, inmonth, onClick, title: _date.toDateString() };
        // Conditionally render a styled date component
        const DateComponent = isCurrent
            ? Styled.HighlightedCalendarDate
            : isToday
              ? Styled.TodayCalendarDate
              : Styled.CalendarDate;
        return (
            <DateComponent key={getDateISO(_date)} {...props}>
                {_date.getDate()}
            </DateComponent>
        );
    };

    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
        const ms = tomorrow - now;
        const dayTimeout = setTimeout(() => {
            setToday(new Date());
            clearDayTimeout();
        }, ms);
        const clearDayTimeout = () => {
            dayTimeout && clearTimeout(dayTimeout);
        };
        return () => {
            clearPressureTimer();
            clearDayTimeout();
        };
    }, [clearPressureTimer]);

    return (
        <>
            <Styled.CalendarContainer>
                {renderMonthAndYear()}
                <Styled.CalendarGrid>
                    <Fragment>{Object.keys(WEEK_DAYS_EN).map(renderDayLabel)}</Fragment>
                    <Fragment>{getCalendarDates().map(renderCalendarDate)}</Fragment>
                </Styled.CalendarGrid>
            </Styled.CalendarContainer>
        </>
    );
}
Calendar.propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChanged: PropTypes.func
};
