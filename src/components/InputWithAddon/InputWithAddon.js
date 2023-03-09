export default function InputWithAddon({ label, autofocus = false, value, placeholder, rightSymbol, onKeyUp, symbol, onChange, onBlur, containerClassnames }) {
    return(
        <div className={containerClassnames}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            <div className="flex relative">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    {symbol}
                </span>
                <input
                    type="text"
                    value={value}
                    onBlur={onBlur}
                    autoFocus={autofocus}
                    onKeyUp={({key}) => {
                        if (key === "Enter") {
                            if (onKeyUp) {
                                onKeyUp()
                            }
                        }
                    }}
                    onChange={onChange}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                />
                {
                    rightSymbol && <span className="absolute right-1 top-3 items-center px-3 text-sm text-gray-900 dark:text-gray-400">
                        {rightSymbol}
                    </span>
                }
            </div>
        </div>
    )
}