import React, { useState } from 'react'
import axios from 'axios'

function FindCity() {
    const [form, setForm] = useState({ city: '', value: '' });

    const onSubmit = (event) => {
        event.preventDefault();
        getData(form.city)
    };

    const onChangeInput = (event) => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const getData = async (city) => {
        axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`).then(res => convertToCelcius(res.data.main.temp))
    }

    const convertToCelcius = temp => {
        setForm({...form, 'value': Math.floor(Number(temp) - 273.5) })
    };

    return (
        <div className='input'>
            <form onSubmit={onSubmit}>
                <label htmlFor='city'>Enter a city</label>
                <input name="city" id="city" type="text" value={form.city} onChange={onChangeInput}/>
                <h3>{form.value} <sup>o</sup> C</h3>
            </form>
        </div>
    )
}

export default FindCity;