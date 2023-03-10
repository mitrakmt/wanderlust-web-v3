export default function CustomCheckbox({ label, checked, value }) {
    return(
        <div className="flex items-center">
            <input id="link-checkbox" checked={checked} type="checkbox" value={value} className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        </div>
    )
}