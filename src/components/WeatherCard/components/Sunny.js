export default function SunnyWeather({ temp, text }) {
    return (
        <div icon="sunny" data-label={text}>
            <span className="sun"></span>
            <p className="font-extrabold text-gray-500 dark:text-gray-400" style={{ fontSize: "40px", marginTop: 60, marginLeft: '34%' }}>{temp}</p>
        </div>
    )
}