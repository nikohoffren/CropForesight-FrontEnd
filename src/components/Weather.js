import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Weather.css'
import './nav.css'
import logo from '../assets/logo.png';
import NAVBAR from './nav';

export const Weather = () => {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [submitPress, setSubmitPress] =useState(false)

    const handleWeather = async () => {
        setSubmitPress(true)
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b96e250f5f9d8682865d4335a802fe2`
            );
            // setWeatherData(response.data)
            if(response.data.cod === '404') {
                setErrorMessage('Improper location. Please try again.');
                setWeatherData(null);
            }
            else {
                setWeatherData(response.data);
                setErrorMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Location does not exist.');
            setWeatherData(null);
        }
    }



    return (
        <div id="weather-page">
            <NAVBAR />
            <div class = "maincontainer">
            <h1>Weather</h1>
            <form className="form-h">
                <input
                    type="text"
                    id="search" placeholder="Search By Location"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </form>
            <button onClick={handleWeather} className="getWeather">SUBMIT</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {weatherData && (
                <div className='Weather'>

                    <p className='name'>{weatherData.name}</p>
                    <p className='dis'>{weatherData.weather[0].description}</p>
                    <p className='temp'>{(weatherData.main.temp-273.15).toFixed(2)}°C</p>
                </div>
            )}
            {weatherData==null && submitPress==true && (
                <div className='Weather'>
                    <p className='name'>Please enter proper Location details.</p>
                </div>
            )}
            </div>
        </div>

    )
}
export default Weather;