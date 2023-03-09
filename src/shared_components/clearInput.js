export default function ClearInput({ label, value, onChange, onKeyUp, disabled, id, type = "text", style = {} }) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-white">
                {label}
            </label>
            <div className="relative w-full mt-1 bg-transparent rounded-md shadow-sm">
                <input
                    type={type}
                    disabled={disabled}
                    style={style}
                    name={label}
                    id={id}
                    className="bg-transparent outline-none dark:text-white pl-7 pr-7 wanderlust-text-input ring-0"
                    placeholder={label}
                    value={value || ""}
                    onChange={onChange}
                    onKeyUp={({ key }) => {
                        if (key === "Enter") {
                            onKeyUp();
                        }
                    }}
                />
            </div>
        </div>
    )
}