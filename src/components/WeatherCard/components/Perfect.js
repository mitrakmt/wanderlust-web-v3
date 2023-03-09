import '../../../styles/weather.module.scss';

export default function PerfectWeather({ temp, text }) {
    return (
        <div icon="cloudy" data-label={text}>
            <span className="cloud"></span>
            <span className="cloud"></span>
            <p className="font-extrabold text-gray-500 dark:text-gray-400" style={{ fontSize: "40px", marginTop: 60, marginLeft: '34%' }}>{temp}</p>
        </div>
    )
}

