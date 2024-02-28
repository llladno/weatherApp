"use client"
import axios from "axios";
import {getLocation} from "@/app/page";
import {getDay, getMonth} from "@/app/services/serviceDay";

import BarChart from "@/app/components/BarChart";
import Link from "next/link";
import React, {useState} from "react";
import {set} from "immutable";
import {log} from "util";
import News from "@/app/components/news/News";

async function getWeather3() {
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&days=3&aqi=no&alerts=no`)
    return res.data
}

async function getWeather2(params: any) {
    let res = await axios.post('/api/weather/', {location: params})
    return res.data.message
}

const DayComponent = ({data}: any) => {
    const day = data.forecast.forecastday[0]

    console.log(data)


    let temps = day.hour.map((x: any) => {
        return x.temp_c
    })

    let times = day.hour.map((t: any) => {
        return t.time.slice(-5)
    })

    console.log(day)
    let date = new Date('1/1/2013' + "05:50 PM")
    console.log(date)

    function getTwentyFourHourTime(amPmString: string) {
        var d = new Date("1/1/2013 " + amPmString);
        return d.getHours() + ':' + d.getMinutes();
    }

    const chartData: any = {
        labels: times,
        datasets: [
            {
                label: 'Temp',
                data: temps,
                tension: 0.4,
                borderColor: '#ffffff',
                color: '#490505'
            },
        ],
    };
    return (
        <div className='day-body'>
            <div className='day-info'>
                <Link href='/'>
                    <button>На главную</button>
                </Link>
                <div className='center'>
                    <h1>{data.location.name}</h1>
                    <p className='greyText'>{data.location.region}</p>
                </div>
                <h2>{day.day.avgtemp_c} °</h2>
                <div className='minmax-temp'>
                    <p>↑{day.day.maxtemp_c}</p>
                    <p>↓ {day.day.mintemp_c}</p>
                </div>
                <div className='more-info'>
                    <p>Ветер: {day.day.avgvis_km} км/ч</p>
                    <p>Осадки: {day.day.totalprecip_mm} мм</p>
                    <p>Дождь: {day.day.daily_chance_of_rain}%</p>
                    <p>Влажность: {day.day.avghumidity}%</p>
                    <p>Восход: {getTwentyFourHourTime(day.astro.sunrise)}</p>
                    <p>Закат: {getTwentyFourHourTime(day.astro.sunset)}</p>

                </div>
                <BarChart data={chartData}></BarChart>
            </div>
            <News></News>
        </div>

    );
};

export default DayComponent;