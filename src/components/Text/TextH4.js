export default function TextH4({ classes = "", children, styles = {} }) {
    return(
        <p className={`my-4 text-xl text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}