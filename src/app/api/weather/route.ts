import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";
import axios from "axios";

export async function POST(req: Request){
    const body = await req.json()
    let result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1475df8ad82c4bc2bd7165248243101&q=${body.location}&days=3&aqi=no&alerts=no`)
    // console.log(result.data)
    return NextResponse.json({message: result.data})
}