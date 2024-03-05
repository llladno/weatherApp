import axios from "axios";
import CurrentWeather from "@/app/components/CurrentWeather";

// async function getWeather() {
//     let res =
//         await axios.get(`http://api.weatherapi.com/v1/current.json?key=1475df8ad82c4bc2bd7165248243101&q=${await getLocation()}&aqi=no`)
//     return res.data
// }


async function getWeather3() {
    let location:any = `Moscow`
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${location}&days=3&aqi=no&alerts=no`)
    return res.data
}



export default async function Home() {
    // const current = await getWeather()
    const days3 = await getWeather3()



    return (
            <CurrentWeather data={days3}></CurrentWeather>
    );
}
