import axios from "axios";
import DayCard from "@/app/components/DayCard";
import CurrentWeather from "@/app/components/CurrentWeather";
import Link from "next/link";

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

    let temps = days3.forecast.forecastday[0].hour.map((x: any) => {
        return x.temp_c
    })

    let times = days3.forecast.forecastday[0].hour.map((t: any) => {
        return t.time.slice(-5)
    })


    let now = +days3.current.last_updated.slice(11, 13)
    const chartData: any = {
        labels: [times[now - 2], times[now - 1], times[now], times[now + 1], times[now + 2]],
        datasets: [
            {
                label: 'Sales',
                data: [temps[now - 2], temps[now - 1], temps[now], temps[now + 1], temps[now + 2]],
            },
        ],
    };
    return (
        <main>
            <CurrentWeather data={days3}></CurrentWeather>
            <div className='cards'>
                <Link href={`/day/0`}>
                    <DayCard data={days3.forecast.forecastday[0]}></DayCard>
                </Link>
                <Link href={`/day/1`}>
                    <DayCard data={days3.forecast.forecastday[1]}></DayCard></Link>
                <Link href={`/day/2`}>
                    <DayCard data={days3.forecast.forecastday[2]}></DayCard>
                </Link>


            </div>
            <div className='news'>
                <div>
                    <h1>News</h1>
                    <h2>In develop</h2>
                </div>
            </div>
        </main>
    );
}
