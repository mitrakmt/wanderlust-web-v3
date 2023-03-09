export default function CustomInput({ label, value, placeholder, onChange, onKeyUp, classes }) {
    return(
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            <input
                onKeyUp={({ key }) => {
                    if (key === "Enter") {
                        if (onKeyUp) {
                            onKeyUp();
                        }
                    }
                }}
                type="text"
                value={value}
                onChange={onChange}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${classes}`}
                placeholder={placeholder}
            />
        </div>
    )
}