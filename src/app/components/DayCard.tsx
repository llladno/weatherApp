import React from 'react';
import {getDay, getMonth} from "@/app/services/serviceDay";

const DayCard = ({data}:any) => {
    const date = new Date(data.date)
    const weatherDay = data.day
    let day = getDay(date.getDay())
    let month = getMonth(date.getMonth())
    let dateDay = date.getDate()

    return (
        <div className='card'>
            <h2>{day}</h2>
                <img src={data.day.condition.icon}/>
            <div>
                <h3>{weatherDay.maxtemp_c > 0 ? `+ ` + weatherDay.maxtemp_c : weatherDay.maxtemp_c}</h3>
                <h4>{weatherDay.mintemp_c > 0 ? `+ ` + weatherDay.mintemp_c : weatherDay.mintemp_c}</h4>
            </div>
        </div>
    );
};

export default DayCard;