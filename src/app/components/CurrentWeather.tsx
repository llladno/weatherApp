"use client"
import {getDay, getMonth} from "@/app/services/serviceDay";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import React, {useEffect, useRef, useState} from "react";
import Cards from "@/app/components/Cards";
import Image from 'next/image'
import Popup from "@/app/components/Popup";
import axios from "axios";


Chart.register(CategoryScale);

// a94e115fb5684a998cddb511ddd2996b
const CurrentWeather = ({data}: any) => {
    let show: boolean = false;
    const [popup, setPopup] = useState(false)
    const [weather, setWeather] = useState(data)
    const [location, setLocation] = useState(data.location.name)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getWeather3(localStorage.getItem("location"))
    }, [])

    const handleChange = (new_location: string, ontrue: boolean) => {
        if (new_location) {
            localStorage.setItem("location", new_location)
            getWeather3(new_location)
        }
        setPopup(ontrue)
    };


    function menu_bar() {
        const grid: any = document.getElementsByClassName('current')[0]
        const menu_buttons: any = document.querySelector('.menu-buttons')
        if (!show) {
            grid.style.transition = 'ease-in-out 0.4s;'
            grid.style.gridTemplateColumns = `250px auto`
            grid.style.transition = 'ease-in-out 0.4s;'
            setTimeout(() => {
                menu_buttons.style.opacity = 1
            }, 200)
            show = !show
        } else {
            show = !show
            menu_buttons.style.opacity = 0
            setTimeout(() => {
                grid.style.gridTemplateColumns = `50px auto`
            }, 200)
        }
    }

    async function getWeather3(location: string) {
        let res = await axios.post('/api/weather/', {location: location})
        setLocation(location)
        setWeather(res.data.message)
        setLoading(false)
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
                </div>
            </div>
            {!loading ? <div className='main-display'>
                    <div className='currentMain'>
                        <div>
                            <h1>{weather.location.name}</h1>
                            <p className='greyText'>{weather.location.region}</p>
                            <div className='flex'>
                                <h2>{weather.current.temp_c} °</h2>
                            </div>
                        </div>
                        <div className='minmax-temp'>
                            <p>↑{weather.forecast.forecastday[0].day.maxtemp_c}</p>
                            <p>↓ {weather.forecast.forecastday[0].day.mintemp_c}</p>
                        </div>
                        <div className='weatherInfo'>
                            <p>Ветер: {(+weather.current.wind_kph / 3.6).toFixed(1)} м/с</p>
                            <p>Ощущается: {weather.current.feelslike_c} °C</p>
                            <p>Влажность: {weather.current.humidity}%</p>
                            <p>Осадки: {weather.current.precip_mm} мм</p>
                        </div>
                    </div>
                    <Cards data={weather} location={location}></Cards>
                </div>
                :
                <div className='loading'>
                    <Image src='/loading.gif' alt={"loading"} width={50} height={50}></Image>
                </div>}

            {popup ? <Popup onChange={handleChange}></Popup>
                : null
            }
        </div>
    );
};
export default CurrentWeather;