import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherService = (city) => {

    const [weatherdata, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const apiKey = '99f15432440767404ea4aad63a10b355'

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

    useEffect(() => {
        getWeatherData();
    }, [])

    const refetch = () => {
        getWeatherData();
    };



    return {weatherdata,refetch}
}

export default WeatherService