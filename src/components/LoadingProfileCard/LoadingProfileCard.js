export default function LoadingProfileCard() {
  return (
        <div role="status" className="max-w-md px-4 py-6 m-6 border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="flex flex-col items-center mb-4 space-x-3">
                <svg className="w-32 h-32 tex-gra-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                <div className="flex flex-col items-center mt-4">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 mt-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="w-48 h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="w-48 h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
            
            <div className="flex justify-center mt-8">
                <div className="h-8 mx-2 bg-gray-300 rounded-full dark:bg-gray-600 w-20 mb-2.5"></div>
                <div className="h-8 mx-2 bg-gray-300 rounded-full dark:bg-gray-600 w-20 mb-2.5"></div>
            </div>
            
            <span className="sr-only">Loading...</span>
        </div>
  )
}