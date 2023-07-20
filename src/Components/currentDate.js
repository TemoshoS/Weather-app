import React, { useState,useEffect } from 'react';
const CurrentDate =()=>{

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const month = date.toLocaleString('default', { month: 'short' });
            const day = addOrdinalIndicator(date.getDate());
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedDate = `${month} ${day}, ${time}`;
            setCurrentDate(formattedDate);
        };

        getCurrentDate();
    }, []);

    

    //

    const addOrdinalIndicator = (day) => {
        if (day === 1 || day === 21 || day === 31) {
            return day + 'st';
        } else if (day === 2 || day === 22) {
            return day + 'nd';
        } else if (day === 3 || day === 23) {
            return day + 'rd';
        } else {
            return day + 'th';
        }
    };
    return(<div>

        <div>{currentDate}</div>

    </div>)
}

export default CurrentDate;