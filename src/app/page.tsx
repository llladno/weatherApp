import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import DayCard from "@/app/components/DayCard";

// async function getWeather() {
//     let res =
//         await axios.get(`http://api.weatherapi.com/v1/current.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&aqi=no`)
//     return res.data
// }

async function getWeather3(){
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&days=3&aqi=no&alerts=no`)
    return res.data
}

async function getLocation() {
    const res = await axios.get("http://ip-api.com/json");
    return `${res.data.country} ${res.data.city}`
}

export default async function Home() {
    // const current = await getWeather()
    const days3 = await getWeather3()
    return (
        <main>
            <h1>{days3.location.name}</h1>
            <h3>{days3.current.temp_c} °C</h3>
            <h4>{days3.current.last_updated.slice(-5)}</h4>
            <div className='cards'>
                <DayCard data={days3.forecast.forecastday[0]}></DayCard>
                <DayCard data={days3.forecast.forecastday[1]}></DayCard>
                <DayCard data={days3.forecast.forecastday[2]}></DayCard>
            </div>
        </main>
    );
}
