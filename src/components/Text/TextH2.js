export default function TextH2({ classes = "", styles = {}, children }) {
    return (
        <p className={`my-6 text-3xl md:text-4xl text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}
