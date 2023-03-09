export default function Input({ text, onClick, loading, disabled, style, bgColor, textColor }) {

    return (
      <div className="">
        <button
            onClick={onClick}
            disabled={loading || disabled}
            style={style}
            className={`w-full ${disabled ? 'bg-gray-300 cursor-disabled' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-700'} border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium ${textColor || "dark:text-white"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
            {text}
        </button>
      </div>
    )
  }