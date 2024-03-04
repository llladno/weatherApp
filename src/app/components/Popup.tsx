import React, {useState} from 'react';
import axios from "axios";

const Popup = ({onChange}: any) => {

    const [string, setString] = useState('')
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    async function send() {
        let result = await axios.get('https://api.hh.ru/areas?locale=EN')
        let newArr: any = []
        let main = ["Moscow", "Saint Petersburg"]

        setLoading(true)
        main.forEach((x)=>{
            if (x.toLowerCase().includes(string)) newArr.push(x)
        })
        let myArr = result.data[0].areas.map((x: any) => {
            return x.areas.filter((y: any) => {
                if (y.name.toLowerCase().includes(string)) newArr.push(y.name)
            })
        })
        setData(newArr.sort((a:any, b:any) => a.length - b.length))
        setLoading(false)
    }


    function test() {
        let increment = 0
        let timer = setTimeout(() => {
            increment++
            if (increment > 3) clearInterval(timer)
        }, 1000)

    }

    function setLocation(event:any){
        if (event.target.textContent === 'send') onChange('', false)
        else onChange(event.target.textContent, false)
    }

    return (
        <div className='popup-window' onClick={e => setLocation(e)}>
            <div className='popup-form' onClick={e => e.stopPropagation()}>
                <div className='search'>
                    <input onChange={(e) => setString(e.target.value.toLowerCase())}/>
                    {/*<input onChange={(e) => test()}/>*/}

                    <button onClick={send}>send</button>
                </div>
                <div>
                    {data.length ? data.map((x:any, index:number) => {
                        return <button className='location-city' onClick={e => setLocation(e)} key={index}>{x}</button>
                    }) : <div></div>}
                </div>
            </div>
        </div>
    );
};

export default Popup;