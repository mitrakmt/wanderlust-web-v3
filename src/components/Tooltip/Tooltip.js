// https://flowbite.com/docs/components/tooltips/

export default function Tooltip({ buttonText, content }) {

    return(
        <>
            <button data-tooltip-target="tooltip-animation" type="button" className="dark:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{buttonText}</button>
            <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 dark:text-white tooltip dark:bg-gray-700">
                {content}
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </>
    )
}