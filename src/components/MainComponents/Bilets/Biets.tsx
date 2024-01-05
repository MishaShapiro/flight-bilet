import { useState } from "react"
import styles from "./Bilets.module.css"
import SortedButton from "./SortedButton/SortedButton"
import Bilet from "./BIlet/Bilet"
import { Ticket } from "../../../App"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import FetchTodosThunk from "../../../redux/fetchTosodThunk"
import loading from "../../../assets/loading.svg"
import { FilterAllTickets } from "../../../redux/FilteredDataSlice"
import Filters from "../Filters/Filters"

const Bilets = function () {

    const [biletCount, setBiletCount] = useState(3)

    const dispatch = useDispatch()

    // Данные с сервера уходят сразу в store

    useEffect(() => {
        function fethcer() : any {
            return FetchTodosThunk()
        }
        dispatch(fethcer())
    }, [])

    // Проверяем, дошли ли данные, если да, то копируем все данные в фильтрованные без каких либо изменений
    const Alldata = useSelector((state : any) => state.allData)
    const data = useSelector((state : any) => state.filteredData)

    useEffect(() => {
        dispatch(FilterAllTickets({tickets: Alldata.tickets}))
    }, [Alldata])

    useEffect(() => {
        setBiletCount(3)
    }, [data])

    // State для отслеживания кнопок сортировки
    const [activeBtn, setActiveBtn] = useState([true, false, false])

    const Sorter = function(data: (Ticket)[], activeBtn: (boolean)[]) {
        const newData = [...data]
        newData.sort((a : Ticket, b: Ticket): number => {
            if (activeBtn[0]) {
                return a.price - b.price
            } else if (activeBtn[1]) {
                return a.duration - b.duration
            } 
            return Number(a.connectionAmount) - Number(b.connectionAmount)
        })
        return newData
    }

    // Отслеживаем изменение ширины экрана

    const [smallSize, setSize] = useState(false)

    useEffect(() => {
        function resize(e: any) {
        const width = e.target.innerWidth
        if (width <= 920) {
            setSize(true)
        } else {
            setSize(false)
        }
        }

        window.addEventListener('resize', resize)
    }, [])

    // Открытие фильтров на малой ширине 

    const [isOpen, setOpen] = useState(false)

    // Изменение title в кнопке

    const [title, setTitle] = useState("Любая авиакомпания, любое кол-во пересадок")

    return (
        <div className={styles.bilets}>
            <div>
                <SortedButton text="Самый дешевый" position="left" active={activeBtn[0]} onClick={() => {setActiveBtn([true, false, false])}}/>
                <SortedButton text="Самый быстрый" position="center" active={activeBtn[1]} onClick={() => {setActiveBtn([false, true, false])}}/>
                <SortedButton text="Самый оптимальный" position="right" active={activeBtn[2]} onClick={() => {setActiveBtn([false, false, true])}}/>
            </div>
            {smallSize || window.innerWidth <= 920 ? 
            <>
                <button className={`${styles.filterButton} ${isOpen ? styles.open : ""}`} onClick={() => {setOpen(!isOpen)}}>
                    {title}
                    <p className={styles.openSettings}>Открыть настройки</p>
                </button> 
                {isOpen ? <Filters buttonTitleChange={setTitle}/> : <></>}
            </>
            : <></>}
            <div>
                {data.tickets.length > 0 ?
                    (data.tickets[0].loading ? 
                        <div className={styles.loadingCont}>
                            <img className={styles.loading} src={loading} alt="Loading..."/>
                        </div>
                        :
                        (Sorter(data.tickets, activeBtn).map((data, index) => {
                            if (index >= biletCount) {
                                return (<></>)
                            }
                            return (<Bilet data={data}/>)
                        }))
                    )
                    :
                    <div className={styles.loadingCont}>
                        <p className={styles.nodata}>No data</p>
                    </div>
                }
            </div>
            <button disabled={biletCount >= data.tickets.length} className={styles.loadmore} onClick={() => {setBiletCount(biletCount + 3)}}>Загрузить еще билеты</button>
        </div>
    )
}

export default Bilets