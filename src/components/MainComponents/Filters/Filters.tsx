import Filter from "./Filter/Filter"
import styles from "./Filters.module.css"
import CheckBox from "./Filter/CheckBox/CheckBox"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Ticket } from "../../../App"
import { FilterAllTickets } from "../../../redux/FilteredDataSlice"

const Filters = function({ wideWindow=false, buttonTitleChange = (data : string) : void => {data}}) {

    const dispatch = useDispatch()
    const [checked, setChecked] = useState([false, false, false, false, false, false, false])

    function changeChecked(check: (boolean)[], i : number) : (boolean)[] {
        const newChecked = [...check]
        newChecked[i] = !check[i]
        return newChecked
    }

    const AllData = useSelector((state : any) => state.allData)

    useEffect(() => {
        let data = {...AllData}.tickets

        data = data.filter((item : Ticket) => {
            return ((checked[0] && item.connectionAmount === 0 || 
                checked[1] && item.connectionAmount === 1 || 
                checked[2] && item.connectionAmount === 2 || 
                checked[3] && item.connectionAmount === 3) ||
                !( checked[0] || checked[1] || checked[2] || checked[3]))
        })
        
        data = data.filter((item : Ticket) => {
            return ((checked[4] && item.company === "pobeda" || 
                checked[5] && item.company === "redWings" || 
                checked[6] && item.company === "sseven") || 
                !( checked[4] || checked[5] || checked[6]))
        })

        
        dispatch(FilterAllTickets({tickets: data}))
        let avia = `Авиакомпании:${checked[4] ? " Победа" : ""}${checked[5] ? " Red Wings" : ""}${checked[6] ? " S7" : ""}`
        let connection = `Пересадки:${checked[0] ? " 0" : ""}${checked[1] ? " 1" : ""}${checked[2] ? " 2" : ""}${checked[3] ? " 3" : ""}`
        if (avia === "Авиакомпании:") {
            avia = "Любая авиакомпания"
        }
        if (connection === "Пересадки:") {
            connection = "любое кол-во пересадок"
        }
        buttonTitleChange(avia + ", " + connection)
    }, [checked])

    return (
        <div className={`${styles.filters} ${styles[wideWindow ? "wide" : "notwide"]}`}>
            <Filter heading="Количество пересадок">
                <>
                    <CheckBox label="Без пересадок" type="square" change={() => {setChecked(changeChecked(checked, 0))}}/>
                    <CheckBox label="1 пересадка" type="square" change={() => {setChecked(changeChecked(checked, 1))}}/>
                    <CheckBox label="2 пересадки" type="square" change={() => {setChecked(changeChecked(checked, 2))}}/>
                    <CheckBox label="3 пересадки" type="square" change={() => {setChecked(changeChecked(checked, 3))}}/>
                </>
            </Filter>
            <Filter heading="Компания">
                <>
                    <CheckBox label="Победа" type="circle" change={() => {setChecked(changeChecked(checked, 4))}}/>
                    <CheckBox label="Red Wings" type="circle" change={() => {setChecked(changeChecked(checked, 5))}}/>
                    <CheckBox label="S7 Airlines" type="circle" change={() => {setChecked(changeChecked(checked, 6))}}/>
                </>
            </Filter>
        </div>
    )
}

export default Filters