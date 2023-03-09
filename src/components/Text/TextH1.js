export default function TextH1({ classes = "", children, styles = {} }) {
    return(
        <p className={`my-6 text-6xl text-gray-700 dark:text-white ${classes}`} style={styles}>{children}</p>
    )
}