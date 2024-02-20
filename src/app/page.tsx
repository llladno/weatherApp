import axios from "axios";
import DayCard from "@/app/components/DayCard";
import CurrentWeather from "@/app/components/CurrentWeather";
import Link from "next/link";
import BarChart from "@/app/components/BarChart";
import Cards from "@/app/components/Cards";

// async function getWeather() {
//     let res =
//         await axios.get(`http://api.weatherapi.com/v1/current.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&aqi=no`)
//     return res.data
// }

async function getWeather3() {
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&days=3&aqi=no&alerts=no`)
    return res.data
}

export async function getLocation() {
    const res = await axios.get("http://ip-api.com/json");
    return `${res.data.country} ${res.data.city}`
}

export default async function Home() {
    // const current = await getWeather()
    const days3 = await getWeather3()



    return (
        <main>
            <div className='current-background'>
                <div className='current-background_circle'></div>
            </div>
            <CurrentWeather data={days3}></CurrentWeather>
            {/*<Cards data={days3}></Cards>*/}
            {/*<div className='news bg'>*/}
            {/*    <div>*/}
            {/*        <h1>News</h1>*/}
            {/*        <h2>In develop</h2>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    );
}
