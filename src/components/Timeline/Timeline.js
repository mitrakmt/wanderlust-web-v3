import { useState } from 'react';

const month = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Timeline({ data }) {
    const [currentMonth] = useState(month[new Date().getMonth()]);
    
    const humanizeDate = (date_str) => {
        let date_arr = date_str.split('-');
        
        return month[Number(date_arr[1]) - 1] + " " + Number(date_arr[2]) + ", " + date_arr[0]
    }

    const getMonth = (date_str) => {
        let date_arr = date_str.split('-');

        return month[Number(date_arr[1]) - 1]
    }

    return(
        <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
            {
                data.map(({ name, description, date: { iso }, link }) => (
                    <li className="mb-6 ml-4" key={`timeline-${name}-${iso}`}>
                        <div className={`absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border ${getMonth(iso) === currentMonth ? "border-green-500 dark:border-green-500 dark:bg-green-500 bg-green-500" : "dark:bg-gray-700 border-white dark:border-gray-900"}`}></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{humanizeDate(iso)}</time>
                        <h3 className="font-semibold text-gray-900 text-md dark:text-white">{name}</h3>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
                        {link && <a href={link} target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></a>}
                    </li>
                ))
            }
        </ol>
    )
}