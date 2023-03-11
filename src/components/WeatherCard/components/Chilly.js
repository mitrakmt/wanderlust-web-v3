export default function ChillyWeather({ temp, text }) {
    return (
        <div icon="snowy" data-label={text} className="whitespace-nowrap">
            <span className="snowman"></span>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
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

