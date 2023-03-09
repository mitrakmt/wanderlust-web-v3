export default function TextH3({ classes = "", children, styles = {} }) {
    return(
        <p className={`my-6 text-2xl text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}