import styles from "./CheckBox.module.css"

interface propsType {
    label: string,
    type: "square" | "circle"
    change: () => void
}

const CheckBox = function ({label = "", type="square", change = () => {}} : propsType) {
    return (
        <div className={styles.container}>
            <input type="checkbox" id={label} className={`${styles.input} ${(type === "square" ? styles.square : styles.circle)}`} onChange={change}/>
            <label htmlFor={label} className={styles.label}>{label}</label>
        </div>
    )
}

export default CheckBox