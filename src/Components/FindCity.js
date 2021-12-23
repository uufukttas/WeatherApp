import React, { useState } from 'react'
import axios from 'axios';
import '../output.css'

function FindCity() {
    const [form, setForm] = useState({ city: '', value: '' });

    const onSubmit = (event) => {
        event.preventDefault();
        getData(form.city);
        setBackground();
    };

    const onChangeInput = (event) => {
        setForm({...form, [event.target.name]: event.target.value })
    };

    const getData = async (city) => {
        axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => convertToCelcius(res.data.main.temp));
    };

    const convertToCelcius = temp => {
        setForm({...form, 'value': Math.floor(Number(temp) - 273.5) })
    };

    const setBackground = () => {
        document.getElementById('root').style.backgroundPosition = 'center center';
        document.getElementById('form-container').style.backgroundColor = 'rgba(255,255,255,0.7)';
        document.getElementById('root').style.backgroundImage = `url(${findImage(form.value)})`;
    };

    const findImage = temperature => {
        let image;
        
            if (temperature <= 0) {
                image = '/snow.jpg';
            } else if (temperature <= 10 && temperature > 0) {
                image = '/rainy.jpg';
            } else if (temperature <= 20 && temperature > 10) {
                image = '/spring.jpg';
            } else if (temperature > 20) {
                image = '/sunny.jpg';
            } else {
                image = '';
        }

        return image;
    };

    return (
        <div id='form-container' className='input p-6 max-w-sm ml-auto bg-white rounded-xl shadow-lg flex items-center justify-center aling-center flex-col'>
            <form onSubmit={onSubmit} className='flex justify-center aling-center'>
                <label htmlFor='city' className='px-2'>Enter a city</label>
                <input name="city" id="city" type="text" value={form.city} onChange={onChangeInput} className='rounded-md border-2 border-black'/>
            </form>
            <h3 className='flex w-4/5 justify-end pr-6'>{form.value} <sup className='inset-y-2'>o</sup> C</h3>
        </div>
    )
}

export default FindCity;