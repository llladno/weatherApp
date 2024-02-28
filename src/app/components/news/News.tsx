"use client"
import React, {useEffect, useState} from 'react';
import axios from "axios";

async function getData (){
    let res = await axios.get('http://localhost:3000/api/news/')
    console.log(res.data.message)
    return res.data.message
}

const News = () => {
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        let res = axios.get('http://localhost:3000/api/news/').then((e)=>{
            setData(e.data.message)
            setLoading(false)
        })
    },[])

    console.log(data)



    return (
        <div className='news-cards'>
            {!loading ? <div>
                <h1>Последние новости</h1>
                {data.articles.map((x:any)=>{
                    return (<div className='news-card'>
                        <h1>{x.title === '[Removed]' ? null : x.title}</h1>
                        <h2>{x.author === '[Removed]' ? null : x.author}</h2>
                        <p>{x.description === '[Removed]' ? null : x.description}</p>
                        <p>{x.content === '[Removed]' ? null : x.content}</p>
                        <div>
                            {x.source.name === '[Removed]' ? null : <p>Взято с: <a href={x.url}>{x.source.name}</a></p>}
                        </div>
                    </div>)
                })}
            </div>
            : <h1>Loading</h1>}
        </div>
    );
};

export default News;