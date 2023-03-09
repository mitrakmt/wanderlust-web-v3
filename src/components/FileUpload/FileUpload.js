export default function FileUpload({ text, onChange }) {
    return(
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" ariaDescribedby="user_avatar_help" id="user_avatar" type="file" />
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">{text}</div>
        </>
    )
}