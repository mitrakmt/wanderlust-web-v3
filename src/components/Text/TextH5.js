export default function TextH5({ classes = "", children, styles = {} }) {
    return(
        <p className={`my-4 text-lg text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}