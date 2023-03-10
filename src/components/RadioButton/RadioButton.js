export default function RadioButton({ legend, checked, label, onChange, value }) {
    return(
        <>
            <fieldset>
                <legend className="sr-only">{legend}</legend>

                <div className="flex items-center mb-4">
                    <input onChange={onChange} type="radio" name="countries" value={value} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-600 dark:focus:bg-primary-600 dark:bg-gray-700 dark:border-gray-600" checked={checked} />
                    <label className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {label}
                    </label>
                </div>
            </fieldset>        
        </>
    )
}