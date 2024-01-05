import styles from "./Header.module.css"
import planeImg from "../../assets/plane.svg"

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={planeImg} alt="plane.svg" />
            <p className={styles.name}>Поиск авиабилетов</p>
        </header>
    )
}

export default Header