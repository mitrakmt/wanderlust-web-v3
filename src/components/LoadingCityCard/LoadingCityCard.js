export default function LoadingCityCard() {
  return (
        <div role="status" className="w-48 px-4 py-6 border border-gray-200 rounded-lg shadow animate-pulse md:p-6 dark:border-gray-700">
            <div className="flex flex-col items-center mt-2 mb-4 ml-0 space-x-3">
                <div className="flex justify-between w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-2"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8 mb-2"></div>
                </div>
                <div className="flex flex-col items-center mt-4" style={{ marginLeft: 0 }}>
                    <div className="h-2 mt-4 bg-gray-200 rounded-full w-28 dark:bg-gray-700"></div>
                    <div className="h-2 mt-2 bg-gray-200 rounded-full w-28 dark:bg-gray-700"></div>
                </div>
            </div>
            
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-14 w-6 mb-2"></div>
            
            <span className="sr-only">Loading...</span>
        </div>
  )
}