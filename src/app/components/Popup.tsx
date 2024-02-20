import React, {useState} from 'react';
import axios from "axios";

const Popup = ({onChange}: any) => {

    const [string, setString] = useState('')
    const [data, setData] = useState([])

    async function send() {
        let result = await axios.get('https://api.hh.ru/areas?locale=EN')
        let newArr: any[] = []
        let myArr = result.data[0].areas.map((x: any) => {
            return x.areas.filter((y: any) => {
                if (y.name.toLowerCase().includes(string)) newArr.push(y.name)
            })
        })
        console.log(string)
        console.log(newArr)
        setData(newArr)
    }


    function test() {
        let increment = 0
        console.log(increment)
        let timer = setTimeout(() => {
            increment++
            console.log(new Date().toTimeString())
            if (increment > 3) clearInterval(timer)
        }, 1000)

    }

    function setLocation(event:any){
        console.log()
        onChange(event.target.textContent, false)
    }

    return (
        <div className='popup-window'>
            <div className='popup-form'>
                <input onChange={(e) => setString(e.target.value.toLowerCase())}/>
                {/*<input onChange={(e) => test()}/>*/}

                <button onClick={send}>send</button>
                <div>
                    {data ? data.map((x, index) => {
                        return <button onClick={e => setLocation(e)} key={index}>{x}</button>
                    }) : null}
                </div>
            </div>
        </div>
    );
};

export default Popup;