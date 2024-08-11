import {useEffect, useState} from "react";
import axios from "axios";


const Weather = ({country}) => {
    const [weather,setWeather] = useState(null)
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    console.log(import.meta.env)
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`)
            .then(res => {
                console.log(res.data)
                setWeather(res.data)
            })
    }, [])
    if (weather === null) return null
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} />
            <p>wind {weather.wind.speed} m/s</p>
        </div>)
}

export default Weather