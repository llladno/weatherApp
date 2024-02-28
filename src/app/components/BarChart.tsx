"use client"
import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {white} from "next/dist/lib/picocolors";

interface BarChartProps {
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }:any) => {
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#9e61e8', // Устанавливаем белый цвет для значений
                },
                grid: {
                    display: false,
                },
            },
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9e61e8', // Устанавливаем белый цвет для значений
                },
            },
        },
    };
    return (
        <div className='lineChart'>
            <Line
                data={data}
                options={options}
            />
        </div>
    );
};

export default BarChart;
