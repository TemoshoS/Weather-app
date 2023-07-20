import './App.css';
import WeatherService from './Components/weatherService';
import CurrentDate from './Components/currentDate';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAfrica, faWind, faTint, faCloud } from '@fortawesome/free-solid-svg-icons';



function App() {

  const [city, setCity] = useState('pretoria');
  const {weatherdata, refetch,error}=  WeatherService(city);
  const [isCelsius, setCelscius] = useState(true);
  


 const image = 'https://openweathermap.org/img/wn/' + weatherdata?.weather[0].icon+'.png';

  const handleUnitChange = () => {
    setCelscius(!isCelsius);

};


/*converting from kelvin to celsius */

const convertToCelsius = (kelvin) => {
    if (kelvin === '-') return '-';
    return (kelvin - 273.15).toFixed(0) + '°';
};


//returning selected temparature

const temperature = isCelsius
    ? `${convertToCelsius(weatherdata ? weatherdata.main.temp : '-')}`
    : `${weatherdata ? weatherdata.main.temp : '-'}°`;




  return (
    <div className="App">

<div className='nav-weather'> <FontAwesomeIcon icon={faEarthAfrica} className='world' />

<h1>Weather Status</h1>

</div>

<div style={{ marginLeft: '14%' }}>

<form onSubmit={(event) => event.preventDefault()}>
    <input type='text' onChange={(event) => setCity(event.target.value)} placeholder='enter a city' className='search-input' />
    <button type='button' onClick={refetch} className='search-button'>Search</button>


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
        <p><CurrentDate /></p>

    </div>

    <div>
        <h1>{weatherdata.weather[0].main}</h1>
        <p>{weatherdata.weather[0].description}</p>
    </div>

    <div >
          <img style={{width:'150px',height:'150px'}} src={image}/>
    </div>

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
     
     
    </div>
  );
}

export default App;
