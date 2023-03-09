export default function InputWithValidation({ label, value, error, onChange, onKeyUp, placeholder }) {
    return(
        <>
            <div>
                <label className={`block mb-2 text-sm font-medium ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>{label}</label>
                <input
                    onKeyUp={({ key }) => {
                        if (key === "Enter") {
                            if (onKeyUp) {
                                onKeyUp();
                            }
                        }
                    }}
                    type="text"
                    onChange={onChange}
                    id="input-validation"
                    value={value}
                    className={error ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                    placeholder={placeholder}
                />
                {
                    error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {error}</p>
                }
            </div>
        </>
    )
}