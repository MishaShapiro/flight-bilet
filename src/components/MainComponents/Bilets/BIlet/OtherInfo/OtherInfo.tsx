import styles from "./OtherInfo.module.css"

interface propsType {
    heading: string,
    text: string,
}

const OtherInfo = function({heading="", text=""} : propsType) {
    return (
        <div className={styles.container}>
            <p className={styles.heading}>{heading}</p>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default OtherInfo