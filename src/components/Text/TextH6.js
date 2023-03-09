export default function TextH6({ classes = "", children, styles = {} }) {
    return(
        <p className={`my-4 text-md text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}