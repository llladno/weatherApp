import React from 'react';
import {getDay, getMonth} from "@/app/services/serviceDay";

const DayCard = ({data}:any) => {
    const date = new Date(data.date)
    const weatherDay = data.day
    let day = getDay(date.getDay())
    let month = getMonth(date.getMonth())
    let dateDay = date.getDate()
    console.log(data)
    return (
        <div className='card'>
            <h2>{day}</h2>
            <h6>{dateDay} {month}</h6>
            <div>
                <img src={data.day.condition.icon}/>
                <h3>{weatherDay.maxtemp_c > 0 ? `+ ` + weatherDay.maxtemp_c : weatherDay.maxtemp_c}</h3>
            </div>
            <h5>{weatherDay.mintemp_c > 0 ? `+ ` + weatherDay.mintemp_c : weatherDay.mintemp_c}</h5>
        </div>
    );
};

export default DayCard;