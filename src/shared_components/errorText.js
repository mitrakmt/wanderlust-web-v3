function ErrorText ({ error }) {
    return error && <p className="text-red-500 text-md font-bold mt-2">{error}</p>
}

export default ErrorText