export default function CustomSelect({ label, data, select, previousValue, setPreviousValue, selected, imagePropertyName }) {
    const onChange = (evt) => {
        const selectedItem = data.find(place => place.name === evt.target.value);

        if (previousValue === null) {
            setPreviousValue(selected)
        }

        select(selectedItem);
    }

    return(
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{label}</label>
            <select onChange={(item) => onChange(item)} value={selected.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {
                    data?.map(option => (
                        <option key={`select-${label}-${option.name}`} value={option.name}>{imagePropertyName && option[imagePropertyName]} {option.name}</option>
                    ))
                }
            </select>
        </>
    )
}
