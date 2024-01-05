import styles from "./Bilet.module.css"
import pobeda from "../../../../assets/pobeda.png"
import sseven from "../../../../assets/sseven.png"
import redWings from "../../../../assets/redWings.png"
import OtherInfo from "./OtherInfo/OtherInfo"
import { Ticket } from "../../../../App"

interface dataType {
    data: Ticket,
}

const Bilet = function ({data} : dataType) {

    const allPrice : string = `${Math.floor(data.price / 1000)} ${data.price % 1000} ${data.currency === "RUB" ? "Р" : ""}`
    let company = "no company"
    let connectionAmount = "Без пересадок"

    switch(data.company) {
        case "pobeda":
            company = pobeda
            break
        case "sseven":
            company = sseven
            break
        case "redWings":
            company = redWings
    }

    switch(data.connectionAmount) {
        case 1:
            connectionAmount = "1 пересадка"
            break
        case 2:
            connectionAmount = "2 пересадки"
            break
        case 3:
            connectionAmount = "3 пересадки"
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainInfo}>
                <p className={styles.price}>{allPrice}</p>
                <div className={styles.imgContainer}>
                    <img src={company} alt="Company.png" />
                </div>
            </div>
            <div className={styles.otherInfo}>
                <OtherInfo heading={`${data.from} - ${data.to}`} text={`${data.time.startTime} - ${data.time.endTime}`}/>
                <OtherInfo heading="В пути" text={`${Math.floor(data.duration / 60)} ч ${data.duration % 60} мин`}/>
                <OtherInfo heading="Пересадки" text={connectionAmount}/>
            </div>
        </div>
    )
}

export default Bilet 