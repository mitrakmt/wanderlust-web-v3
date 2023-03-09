export default function InputGroup({ label, options, placeholder, name }) {
    return (
      <div>
        <label htmlFor="price" className="block text-sm font-medium dark:text-white">
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">?</span>
          </div>
          <input
            type="text"
            name={label}
            id={label}
            className="block w-full pr-12 border-gray-300 rounded-md pl-7 sm:text-sm"
            placeholder={placeholder}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label className="sr-only">
              {label}
            </label>
            <select
              id={name}
              name={name}
              className="h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md pr-7 sm:text-sm"
            >
              {
                options.map((option) => {
                  <option>{option}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>
    )
  }