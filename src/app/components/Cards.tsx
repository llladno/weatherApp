import React from 'react';
import BarChart from "@/app/components/BarChart";
import Link from "next/link";
import DayCard from "@/app/components/DayCard";

const Cards = ({data, location}: any) => {
    let temps = data.forecast.forecastday.map((x: any) => {
        return x.day.avgtemp_c
    })

    let times = data.forecast.forecastday.map((t: any) => {
        return t.date.slice(-2)
    })

    let now = +data.current.last_updated.slice(11, 13)
    const chartData: any = {
        labels: times,
        datasets: [
            {
                label: 'Temp',
                data: temps,
                tension: 0.4,
                borderColor: '#9e61e8',
                color: '#9e61e8'
            },
        ],
    };

    console.log(location)

    return (
        <div className='cardsBG'>
            <div className='cardPlace bg'>
                <div className='cards'>
                    <Link href={{pathname: `/day/0`,
                    query: {location: location},
                        }}>
                        <DayCard data={data.forecast.forecastday[0]}></DayCard>
                    </Link>
                    <Link href={`/day/1`}>
                        <DayCard data={data.forecast.forecastday[1]}></DayCard></Link>
                    <Link href={`/day/2`}>
                        <DayCard data={data.forecast.forecastday[2]}></DayCard>
                    </Link>
                </div>
                <div className='lineCard'>
                    <BarChart data={chartData}></BarChart>
                </div>
            </div>
        </div>
    );
};

export default Cards;