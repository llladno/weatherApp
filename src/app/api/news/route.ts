
// https://newsapi.org/v2/top-headlines?country=us&apiKey=a94e115fb5684a998cddb511ddd2996b

import axios from "axios";
import {NextResponse} from "next/server";

export async function GET(req: Request){
    let result = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=a94e115fb5684a998cddb511ddd2996b`)
    return NextResponse.json({message: result.data})
}