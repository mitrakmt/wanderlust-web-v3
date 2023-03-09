import '../../../styles/weather.module.scss';

export default function SoggyWeather({ temp, text  }) {
    return (
        <div icon="stormy" data-label={text}>
            <span className="cloud"></span>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <p className="font-extrabold text-gray-500 dark:text-gray-400" style={{ fontSize: "40px", marginTop: 60, marginLeft: '34%' }}>{temp}</p>
        </div>
    )
}

