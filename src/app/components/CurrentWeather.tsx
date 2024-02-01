"use client"
import {getDay, getMonth} from "@/app/services/serviceDay";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import BarChart from "@/app/components/BarChart";
import {useEffect, useRef} from "react";
Chart.register(CategoryScale);

const CurrentWeather = ({data}: any) => {

    const date = new Date(data.location.localtime)
    const weatherDay = data.day
    let day = getDay(date.getDay())
    let month = getMonth(date.getMonth())
    let dateDay = date.getDate()
    // const condition = translatedWeather(data.current.condition.text)
    let temps = data.forecast.forecastday[0].hour.map((x:any)=>{
        return x.temp_c
    })

    let times = data.forecast.forecastday[0].hour.map((t:any)=>{
        return t.time.slice(-5)
    })

    console.log(temps.length)
    console.log(data.current.last_updated.slice(11,13))
    let now = +data.current.last_updated.slice(11,13)
    const chartData:any = {
        labels: [times[now-2],times[now-1], times[now],times[now+1],times[now+2]],
        datasets: [
            {
                label: 'Temp',
                data: [temps[now-2],temps[now-1], temps[now],temps[now+1],temps[now+2]],
                tension: 0.4,
                borderColor: '#ffffff',
                color: '#ffffff'
            },
        ],
    };

    return (
        <div className='current'>
            <p className='greyText'>{dateDay} {month}, {day} {data.current.last_updated.slice(-5)}</p>
            <div>
                <h1>{data.location.name}</h1>
                <p className='greyText'>{data.location.region}</p>
            </div>
            <div className='flex'>
                <img src={data.current.condition.icon}></img>
                <h2>{data.current.temp_c} °C</h2>
            </div>
            <BarChart data={chartData}></BarChart>
            <div className='weatherInfo'>
                <p>Ветер: {(+data.current.wind_kph/3.6).toFixed(1)} м/с</p>
                <p>Ощущается: {data.current.feelslike_c} °C</p>
                <p>Влажность: {data.current.humidity}%</p>
                <p>Осадки: {data.current.precip_mm} мм</p>
            </div>
        </div>
    );
};

export default CurrentWeather;