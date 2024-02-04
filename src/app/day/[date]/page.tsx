import axios from "axios";
import {getLocation} from "@/app/page";
import {getDay, getMonth} from "@/app/services/serviceDay";
import BarChart from "@/app/components/BarChart";
import Link from "next/link";

async function getWeather3() {
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&days=3&aqi=no&alerts=no`)
    return res.data
}

const Page = async ({params}:any) => {
    let data = await getWeather3().then(res => res.forecast.forecastday[+params.date])

    console.log(data)
    let temps = data.hour.map((x:any)=>{
        return x.temp_c
    })

    let times = data.hour.map((t:any)=>{
        return t.time.slice(-5)
    })
    
    const chartData:any = {
        labels: times,
        datasets: [
            {
                label: 'Temp',
                data: temps,
                tension: 0.4,
                borderColor: '#ffffff',
                color: '#ffffff'
            },
        ],
    };
    const date = new Date(data.date)
    // const weatherDay = data.day
    let day = getDay(date.getDay())
    let month = getMonth(date.getMonth())
    let dateDay = date.getDate()
    return (
        <div>
            {/*<h2>{weatherDay}</h2>*/}
            <Link href='/'><button>На главную</button></Link>
            <h2>{day}</h2>
            <h2>{dateDay} {month}</h2>
            <h3>Max: {data.day.maxtemp_c} °C</h3>
            <h3>Min: {data.day.mintemp_c} °C</h3>
            <div>
                <BarChart data={chartData}></BarChart>
            </div>
        </div>
    );
};

export default Page;