import './date.page.css'
import DayComponent from "@/app/components/DayComponent";
import axios from "axios";

async function getWeather3(params:any) {
    console.log(params)
    let res =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${params}&days=3&aqi=no&alerts=no`)
    return res.data
}
const Page = async  (params:any) => {
    return (
            <DayComponent data={await getWeather3(params.searchParams.location)}></DayComponent>
    );
};

export default Page;