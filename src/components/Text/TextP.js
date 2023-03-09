export default function TextP({ classes = "", children, styles = {} }) {
    return(
        <p className={`text-xs text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}