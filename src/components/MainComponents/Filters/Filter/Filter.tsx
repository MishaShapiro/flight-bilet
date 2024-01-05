import { ReactElement } from "react"
import styles from "./Filter.module.css"

interface propsType {
    heading: String,
    children: ReactElement,
}

const Filter = function ({heading = "", children = <></>}: propsType) {
    return (
        <div className={styles.connectionAmount}>
            <h2 className={styles.title}>{heading}</h2>
            <div className={styles.checkBoxes}>
                {children}
            </div>
        </div>
    )
}

export default Filter