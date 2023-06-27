import { useReducer, useState } from 'react'
import './App.css'
import { PageContext } from './PageContext'
import Student from './Student'
import Faculty from './Faculty'
import { LoginContext } from './LoginContext'
import { SlotContext } from './SlotContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [slots, dispatch] = useReducer(reducer, slotDetails)

  const goToStudent = () => {
    setCurrentPage('student')
  }

  const goToFaculty = () => {
    setCurrentPage('faculty')
  }
  const goToHome = () => {
    setCurrentPage('home')
    setIsLoggedIn(false)
  }

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('roll')
  }

  const hasBookedAlready = (rollNo) => {
    let slots = JSON.parse(localStorage.getItem('bookedslots'))
    if (!slots) return false
    let current = slots.filter(
      (s) => s.team.filter((t) => t.roll == rollNo)[0]
    )[0]
    if (current) return true
    return false
  }

  return (
    <main className='main'>
      <PageContext.Provider
        value={{ currentPage, goToStudent, goToFaculty, goToHome }}
      >
        <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
          {currentPage === 'home' && (
            <div className='navigation'>
              <button onClick={goToStudent}>Student</button>
              <button onClick={goToFaculty}>Faculty</button>
            </div>
          )}

          <SlotContext.Provider value={{ slots, hasBookedAlready, dispatch }}>
            {currentPage === 'student' && <Student />}
            {currentPage === 'faculty' && <Faculty />}
          </SlotContext.Provider>
        </LoginContext.Provider>
      </PageContext.Provider>
    </main>
  )
}

const initialSlots = [
  {
    id: 'd1s1',
    start_time: '10:00AM',
    end_time: '11:00AM',
    day: 'mon',
    slots_left: 4,
  },
  {
    id: 'd1s2',
    start_time: '1:00PM',
    end_time: '2:00PM',
    day: 'mon',
    slots_left: 4,
  },
  {
    id: 'd1s3',
    start_time: '1:00PM',
    end_time: '2:00PM',
    day: 'mon',
    slots_left: 4,
  },
  {
    id: 'd1s4',
    start_time: '3:00PM',
    end_time: '3:30PM',
    day: 'mon',
    slots_left: 2,
  },
  {
    id: 'd2s1',
    start_time: '10:30AM',
    end_time: '11:00AM',
    day: 'tue',
    slots_left: 2,
  },
  {
    id: 'd2s2',
    start_time: '12:00AM',
    end_time: '1:00PM',
    day: 'tue',
    slots_left: 4,
  },
  {
    id: 'd2s3',
    start_time: '2:30PM',
    end_time: '3:00PM',
    day: 'tue',
    slots_left: 2,
  },
  {
    id: 'd2s4',
    start_time: '4:00PM',
    end_time: '5:00PM',
    day: 'tue',
    slots_left: 4,
  },
  {
    id: 'd3s1',
    start_time: '10:30AM',
    end_time: '11:00AM',
    day: 'wed',
    slots_left: 2,
  },
  {
    id: 'd3s2',
    start_time: '12:30PM',
    end_time: '1:00PM',
    day: 'wed',
    slots_left: 2,
  },
  {
    id: 'd3s3',
    start_time: '1:30PM',
    end_time: '2:30PM',
    day: 'wed',
    slots_left: 4,
  },
  {
    id: 'd3s4',
    start_time: '4:30PM',
    end_time: '6:30PM',
    day: 'wed',
    slots_left: 8,
  },
  {
    id: 'd4s1',
    start_time: '10:30AM',
    end_time: '11:00AM',
    day: 'thur',
    slots_left: 2,
  },
  {
    id: 'd4s2',
    start_time: '12:30PM',
    end_time: '1:00PM',
    day: 'thur',
    slots_left: 2,
  },
  {
    id: 'd4s3',
    start_time: '1:30PM',
    end_time: '2:30PM',
    day: 'thur',
    slots_left: 4,
  },
  {
    id: 'd4s4',
    start_time: '4:30PM',
    end_time: '6:30PM',
    day: 'thur',
    slots_left: 8,
  },
  {
    id: 'd5s1',
    start_time: '10:30AM',
    end_time: '11:00AM',
    day: 'fri',
    slots_left: 2,
  },
  {
    id: 'd5s2',
    start_time: '12:30PM',
    end_time: '1:00PM',
    day: 'fri',
    slots_left: 2,
  },
  {
    id: 'd5s3',
    start_time: '1:30PM',
    end_time: '2:30PM',
    day: 'fri',
    slots_left: 4,
  },
  {
    id: 'd5s4',
    start_time: '4:30PM',
    end_time: '6:30PM',
    day: 'fri',
    slots_left: 8,
  },
]
const slotDetails = {
  bookedSlots: JSON.parse(localStorage.getItem('bookedslots')) || [],
  initialSlots,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'book_slot': {
      let slotId = action.slotId
      let initial = state.initialSlots

      if (initial.filter((s) => s.id === slotId)[0].slots_left === 1) {
        initial.filter((s) => s.id !== slotId)
      }

      console.log(state)
      let bookedSlots = [
        ...state.bookedSlots,
        { id: slotId, team: action.team },
      ]
      localStorage.setItem('bookedslots', JSON.stringify(bookedSlots))
      return {
        bookedSlots,
        initialSlots: initial.map((slot) => {
          if (slot.id == slotId) {
            return {
              ...slot,
              slots_left: slot.slots_left - action.team.length,
            }
          } else {
            return slot
          }
        }),
      }
    }
    default:
      break
  }
}
export default App
