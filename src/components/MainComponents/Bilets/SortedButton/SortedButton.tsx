import styles from "./SortedButton.module.css"

interface propsType {
    text: string,
    position: "left" | "right" | "center",
    active: boolean,
    onClick: any,
}

const SortedButton = function ({text = "", position="center", active=false, onClick} : propsType) {

    const className = `${styles.button} ${styles[position]} ${styles[active ? "active" : ""]}`

    return (
        <button className={className} onClick={onClick}>{text}</button>
    )
}

export default SortedButton