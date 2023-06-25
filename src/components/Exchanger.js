import React, { useState, useEffect } from 'react'
import '../Exchanger.css'

const Exchanger = () => {
    const [currs, setcurrs] = useState([])

    const fetchCurrency = (name) => {
        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
            .then(response => response.json())
            .then(data => {
                data.unshift({
                    r030: 0,
                    txt: "Гривня",
                    rate: 1,
                    cc: "UAH"
                })
                setcurrs(data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchCurrency();
    }, [])

    // Perform calculations
    const calculateCurr = (e) => {
        let sel1 = document.getElementById("currencies1").value;
        let sel2 = document.getElementById("currencies2").value;
        let inp1 = document.getElementById("inp1");
        let inp2 = document.getElementById("inp2");

        if (e.target.id === "inp1" || e.target.id === "currencies2") {
            inp2.value = (sel1 * inp1.value / sel2).toFixed(4);
        }else{
            inp1.value = (sel2 * inp2.value / sel1).toFixed(4);
        }
    }

    return (
        <div className='container'>
            <div className='inputContainer'>
                <input type='number' id='inp1' placeholder='0' onChange={calculateCurr}></input>
                <label htmlFor='currencies1'>Select currency: </label>
                <select name='currencies1' id='currencies1' onChange={calculateCurr}>
                    {currs.map((cur) => <option value={cur.rate}>{cur.txt}</option>)}
                </select>
            </div>
            <div className='inputContainer'>
                <input type='number' id='inp2' placeholder='0' onChange={calculateCurr}></input>
                <label htmlFor='currencies2'>Select currency: </label>
                <select name='currencies2' id='currencies2' onChange={calculateCurr}>
                    {currs.map((cur) => <option value={cur.rate}>{cur.txt}</option>)}
                </select>
            </div>
        </div>
    )
}

export default Exchanger;