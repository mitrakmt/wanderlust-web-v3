import { useState } from 'react';
import Moment from 'moment';
import Image from 'next/image'

// Components
import Sunny from './components/Sunny';
import Soggy from './components/Soggy';
import Perfect from './components/Perfect';
import Cool from './components/Cool';
import Chilly from './components/Chilly';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

export default function WeatherCard({ current, forecast, location }) {
    const [weatherType, setWeatherType] = useState(localStorage.getItem('weatherType'));

    const checkIsRaining = () => {
        try {
            if (current?.condition?.text.contains('rain')) {
                return true
            }
            return false
        } catch {
            return false
        }
    }

    const changeTempType = () => {
        if (weatherType === 'F') {
            setWeatherType('C')
            localStorage.setItem('weatherType', 'C')
        } else {
            setWeatherType('F')
            localStorage.setItem('weatherType', 'F')
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center w-full weather">
            <p className="absolute text-gray-900 top-10 left-12 xl:left-24 dark:text-gray-400">{Moment(location?.localtime).format("hh:mm A")}</p>
            <div className="absolute top-10 right-12">
                <ToggleSwitch onChange={changeTempType} text={weatherType === "F" ? "F" : "C"} checked={weatherType === "F"} />
            </div>
            {
                current && current.is_day ? current.temp_f < 30 ? <Chilly temp={weatherType === "F" ? `${current.temp_f.toFixed(0)}°` : `${current.temp_c.toFixed(0)}°`} text={current?.condition.text} /> : checkIsRaining() ? <Soggy temp={weatherType === "F" ? `${current.temp_f.toFixed(0)}°` : `${current.temp_c.toFixed(0)}°`} text={current?.condition.text} /> : current.temp_f < 40 ? <Chilly temp={weatherType === "F" ? `${current.temp_f.toFixed(0)}°` : `${current.temp_c.toFixed(0)}°`} text={current?.condition.text} /> : current.temp_f > 80 ? <Sunny temp={weatherType === "F" ? `${current.temp_f.toFixed(0)}°` : `${current.temp_c.toFixed(0)}°`} text={current?.condition.text} /> : <Perfect temp={weatherType === "F" ? `${current.temp_f.toFixed(0)}°` : `${current.temp_c.toFixed(0)}°`} text={current?.condition.text} /> : <Cool temp={weatherType === "F" ? `${current.temp_f.toFixed(0)}°` : `${current.temp_c.toFixed(0)}°`} text={current?.condition.text} />
            }
            <div className="flex mt-8 relative">
                {
                    forecast?.forecastday?.map(day => (
                        <div className="flex flex-col items-center justify-center h-10 mx-3 w-14" key={`weather-forecast-${day.date_epoch}`}>
                            <p className="text-gray-900 dark:text-gray-400">{Moment(day?.date).format("ddd")}</p>
                            <Image src={`/icons/day/${day?.day?.condition.icon.substring(day?.day?.condition.icon.lastIndexOf('/') + 1)}`} alt="Weather Image" className="w-8 h-8" width={30} height={30} />
                            <div className="flex">
                                <p className="flex mx-1 text-xs text-gray-900 dark:text-gray-400">{weatherType === "F" ? day?.day.mintemp_f.toFixed(0) : day?.day.mintemp_c.toFixed(0)}°</p>
                                <p className="flex mx-1 text-xs text-gray-900 dark:text-gray-400">{weatherType === "F" ? day?.day.maxtemp_f.toFixed(0) : day?.day.maxtemp_c.toFixed(0)}°</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}