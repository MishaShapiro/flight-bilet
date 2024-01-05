import './App.css'
import { createServer } from "miragejs"
import Header from './components/Header/Header'
import Bilets from './components/MainComponents/Bilets/Biets'
import Filters from './components/MainComponents/Filters/Filters'
import { Provider } from 'react-redux'
import { store } from "./redux/store"
import { useEffect, useState } from 'react'

export interface TicketTime {
  startTime: string,
  endTime: string,
}

export interface Ticket {
  id: number,
  from: string,
  to: string,
  company: string,
  price: number,
  currency: 'RUB',
  time: TicketTime,
  duration: number,
  date: string,
  connectionAmount: number | null,
}

// SERVERSIDE

const mockData : any = {
  tickets: [
      {
        id: 0,
        from: "SVO",
        to: "LED",
        company: "pobeda",
        price: 12680,
        currency: 'RUB',
        time: {startTime: "12:00", endTime: "16:30"},
        duration: 270,
        date: "03/01/2024",
        connectionAmount: 3,
      },
      {
        id: 1,
        from: "SVO",
        to: "LED",
        company: "redWings",
        price: 21500,
        currency: 'RUB',
        time: {startTime: "14:00", endTime: "16:00"},
        duration: 120,
        date: "03/01/2024",
        connectionAmount: 0,
      },
      {
        id: 2,
        from: "SVO",
        to: "LED",
        company: "sseven",
        price: 6680,
        currency: 'RUB',
        time: {startTime: "04:50", endTime: "13:30"},
        duration: 520,
        date: "03/01/2024",
        connectionAmount: 2,
      },
      {
        id: 3,
        from: "SVO",
        to: "LED",
        company: "sseven",
        price: 14680,
        currency: 'RUB',
        time: {startTime: "12:00", endTime: "16:30"},
        duration: 270,
        date: "03/01/2024",
        connectionAmount: 3,
      },
      {
        id: 3,
        from: "SVO",
        to: "LED",
        company: "sseven",
        price: 18180,
        currency: 'RUB',
        time: {startTime: "12:00", endTime: "16:30"},
        duration: 270,
        date: "03/01/2024",
        connectionAmount: 0,
      },
      {
        id: 4,
        from: "SVO",
        to: "LED",
        company: "redWings",
        price: 15500,
        currency: 'RUB',
        time: {startTime: "14:00", endTime: "16:00"},
        duration: 120,
        date: "03/01/2024",
        connectionAmount: 2,
      },
      {
        id: 5,
        from: "SVO",
        to: "LED",
        company: "pobeda",
        price: 8880,
        currency: 'RUB',
        time: {startTime: "12:00", endTime: "16:30"},
        duration: 270,
        date: "03/01/2024",
        connectionAmount: 2,
      },
    ]
}

let server = createServer({})
server.get("/flights", mockData)

function App() {

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

  return (
    <Provider store={store}>
      <div className='container'>
        <Header />
        <main className='main'>
          {smallSize || window.innerWidth <= 920 ? <></> : <Filters wideWindow={true}/>}
          <Bilets />
        </main>
      </div>
    </Provider>
  )
}

export default App
