"use client"
import {getDay, getMonth} from "@/app/services/serviceDay";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import BarChart from "@/app/components/BarChart";
import React, {useEffect, useRef, useState} from "react";
import Cards from "@/app/components/Cards";
import Image from 'next/image'
import Popup from "@/app/components/Popup";
import axios from "axios";
import NextCors from 'nextjs-cors'


Chart.register(CategoryScale);


const CurrentWeather = ({data}: any) => {
    const date = new Date(data.location.localtime)
    let day = getDay(date.getDay())
    let month = getMonth(date.getMonth())
    let dateDay = date.getDate()
    let show: boolean = false;
    const [popup, setPopup] = useState(false)
    const [value, setValue] = useState('');
    const [weather, setWeather] = useState(data)
    const handleChange = (new_location:string, ontrue:boolean) => {
        console.log(new_location)
        if (new_location) {
            getWeather3(new_location)
        }
        setPopup(ontrue)
    };

    let temps = data.forecast.forecastday[0].hour.map((x: any) => {
        return x.temp_c
    })

    let times = data.forecast.forecastday[0].hour.map((t: any) => {
        return t.time.slice(-5)
    })


    let now = +data.current.last_updated.slice(11, 13)
    const chartData: any = {
        labels: [times[now - 2], times[now - 1], times[now], times[now + 1], times[now + 2]],
        datasets: [
            {
                label: 'Temp',
                data: [temps[now - 2], temps[now - 1], temps[now], temps[now + 1], temps[now + 2]],
                tension: 0.4,
                borderColor: '#ffffff',
                color: '#490505'
            },
        ],
    };

    function menu_bar(){
        const grid:any  = document.getElementsByClassName('current')[0]
        const bar:any = document.getElementsByClassName('menu-bar')[0]
        const menu_buttons: any = document.querySelector('.menu-buttons')
        if (!show) {
            grid.style.transition = 'ease-in-out 0.4s;'
            grid.style.gridTemplateColumns = `250px auto`
            grid.style.transition = 'ease-in-out 0.4s;'
            setTimeout(()=>{
                menu_buttons.style.opacity = 1
            },200)
            show = !show
        } else {
            show = !show
            menu_buttons.style.opacity = 0
            setTimeout(()=>{
                grid.style.gridTemplateColumns = `50px auto`
            },200)
        }
    }

    async function getWeather3(location:string) {
        let res = await axios.post('/api/weather/',{location: location})
        setWeather(res.data.message)
    }
    return (
        <div className='current bg'>
            <div className='menu-bar'>
                <button className='menu-bar_button' onClick={menu_bar}>
                    <Image src='/menu-bar.png'
                           width={30}
                           height={30} alt='image'></Image>
                </button>
                <div className='menu-buttons'>
                    <button onClick={() => setPopup(!popup)}>Выбрать город</button>
                    <button>Изменить тему</button>
                </div>
            </div>
            {/*<p>{dateDay} {month}, {day} {data.current.last_updated.slice(-5)}</p>*/}
            <div className='main-display'>
                <div className='currentMain'>
                    <div>
                        <h1>{weather.location.name}</h1>
                        <p className='greyText'>{weather.location.region}</p>
                        <div className='flex'>
                            {/*<img src={data.current.condition.icon}></img>*/}
                            <h2>{weather.current.temp_c} °</h2>
                        </div>
                    </div>
                    <div className='minmax-temp'>
                        <p>↑{weather.forecast.forecastday[0].day.maxtemp_c}</p>
                        <p>↓ {weather.forecast.forecastday[0].day.mintemp_c}</p>
                    </div>
                    {/*<div className='currentLine'>*/}
                    {/*    <BarChart data={chartData}></BarChart>*/}
                    {/*</div>*/}
                    <div className='weatherInfo'>
                        <p>Ветер: {(+weather.current.wind_kph / 3.6).toFixed(1)} м/с</p>
                        <p>Ощущается: {weather.current.feelslike_c} °C</p>
                        <p>Влажность: {weather.current.humidity}%</p>
                        <p>Осадки: {weather.current.precip_mm} мм</p>
                    </div>
                </div>
                <Cards data={weather}></Cards>
            </div>
            { popup ? <Popup onChange={handleChange}></Popup>
                : null
            }
        </div>
    );
};
export default CurrentWeather;