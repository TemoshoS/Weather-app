import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAfrica, faWind, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';




const Weather = () => {

    const [city, setCity] = useState('');
    const [weatherdata, setWeatherData] = useState(null);
    const [isCelsius, setCelscius] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
    const [error, setError] = useState('');

    const handleCitySubmit = (event) => {

        event.preventDefault();
        getWeatherData();
    };

    const getWeatherData = async () => {

        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'99f15432440767404ea4aad63a10b355'}`;
            const res = await axios.get(apiUrl);
            setWeatherData(res.data);

            console.log(res.data)

        } catch (error) {

            setWeatherData(null);
            setError('City does not exist');

        }



    };

    const handleUnitChange = () => {
        setCelscius(!isCelsius);

    };



    useEffect(() => {
        const getCurrentDate = () => {
            const date = new Date();
            const month = date.toLocaleString('default', { month: 'short' });
            const day = addOrdinalIndicator(date.getDate());
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const formattedDate = `${month} ${day}, ${time}`;
            setCurrentDate(formattedDate);
        };

        getCurrentDate();
    }, []);


    /*converting from kelvin to celsius */

    const convertToCelsius = (kelvin) => {
        if (kelvin === '-') return '-';
        return (kelvin - 273.15).toFixed(2) + '°C';
    };


    //

    const addOrdinalIndicator = (day) => {
        if (day === 1 || day === 21 || day === 31) {
            return day + 'st';
        } else if (day === 2 || day === 22) {
            return day + 'nd';
        } else if (day === 3 || day === 23) {
            return day + 'rd';
        } else {
            return day + 'th';
        }
    };

    //returning selected temparature

    const temperature = isCelsius
        ? `${convertToCelsius(weatherdata ? weatherdata.main.temp : '-')}`
        : `${weatherdata ? weatherdata.main.temp : '-'}°`;

    return (<div>

        <div className='nav-weather'> <FontAwesomeIcon icon={faEarthAfrica} className='world' />

            <h1>Weather Status</h1>

        </div>

        <div style={{ marginLeft: '14%' }}>

            <form onSubmit={handleCitySubmit}>
                <input type='text' onChange={(event) => setCity(event.target.value)} placeholder='enter a city' className='search-input' />
                <button type='submit' className='search-button'>Search</button>



                <span style={{ marginLeft: '25%' }}>
                    <button className='fahrenheit-button' onClick={handleUnitChange}>Fahrenheit</button>
                    <button className='celcius-button' onClick={handleUnitChange}>Celcius</button>
                </span></form>
        </div>

        <div className='error'>
            {error && <h1 >{error}</h1>}
        </div>

        {weatherdata && (<div>

            <div className='main-card'>

                <div>
                    <h1>{temperature}</h1>
                    <p>{weatherdata.name}, {weatherdata.sys.country}</p>

                </div>

                <div>
                    <h2>13°/14°</h2>
                    <p>Feels like {temperature}</p>
                    <p>{currentDate}</p>

                </div>

                <div>
                    <h1>Clouds</h1>
                    <p>{weatherdata.weather[0].description}</p>
                </div>

                <div></div>

            </div>

            <div className='cards-container'>
                <div className='wind-card'>
                    <div className='container'>
                        <FontAwesomeIcon icon={faWind} style={{ color: "#a8a8a8", fontSize: '3em' }} />
                        <p>Wind Speed<br></br>{weatherdata.wind.speed}m/s</p>
                    </div>
                </div>

                <div className='humidity-card'>
                    <div className='container'>
                        <FontAwesomeIcon icon={faTint} style={{ color: "#4889f9", fontSize: '3em' }} />
                        <p> Humidity <br></br> {weatherdata.main.humidity}%</p>
                    </div>
                </div>

                <div className='cloud-card'>
                    <div className='container'>
                        <FontAwesomeIcon icon={faCloud} style={{ color: "#f4f7fa", fontSize: '3em' }} />
                        <p>Cloudiness<br></br>{weatherdata.clouds.all}%</p>
                    </div>
                </div>
            </div>
        </div>)}
    </div>)
}

export default Weather;