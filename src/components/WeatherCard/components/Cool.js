export default function CoolWeather({ temp, text }) {
    return (
        <div icon="supermoon" data-label={text}>
            <span className="moon"></span>
            <span className="meteor"></span>
            <p className="font-extrabold text-gray-500 dark:text-gray-400" style={{ fontSize: "40px", marginTop: 60, marginLeft: '34%' }}>{temp}</p>
        </div>
    )
}

