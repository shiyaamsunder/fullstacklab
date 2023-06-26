import { useContext, useEffect, useState } from 'react'
import { PageContext } from './PageContext'
import { LoginContext } from './LoginContext'
import Login from './Login'
import { SlotContext } from './SlotContext'
import './Student.css'

export default function Student() {
  const { goToHome } = useContext(PageContext)
  const { isLoggedIn } = useContext(LoginContext)
  const { slots, hasBookedAlready, dispatch } = useContext(SlotContext)
  const [selectedSlot, setSelectedSlot] = useState('d1s1')
  const [selectedType, setSelectedType] = useState('single')
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const [studentDetails, setStudentDetails] = useState([
    { id: 1, name: '', roll: '' },
  ])

  useEffect(() => setError(null), [])

  useEffect(() => {
    setDisabled(hasBookedAlready(localStorage.getItem('roll')))
    setStudentDetails([
      { id: 1, name: '', roll: JSON.parse(localStorage.getItem('roll')) || '' },
    ])
  }, [hasBookedAlready])

  console.log(disabled)
  const handleClick = () => {
    if (studentDetails.length == 3) {
      setError('Cannot add more than three members')
      return
    }

    let emptyStudent = {
      id: studentDetails.length + 1,
      name: '',
      roll: '',
    }

    setStudentDetails((prev) => [...prev, emptyStudent])
  }

  const handleRemove = (id) => {
    setStudentDetails(studentDetails.filter((student) => student.id != id))
  }

  const handleChange = (e, id) => {
    setStudentDetails(
      studentDetails.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            [e.target.name]: e.target.value,
          }
        } else {
          return student
        }
      })
    )
  }

  const handleTeamTypeChange = (e) => {
    setSelectedType(e.target.name)
  }

  const handleSlotBook = () => {
    dispatch({
      type: 'book_slot',
      slotId: selectedSlot,
      team: studentDetails,
    })
  }

  return (
    <div>
      {error && <h3>Error: {error}</h3>}
      {!isLoggedIn ? (
        <Login label='Roll No' loginFor={'student'} />
      ) : (
        <div>
          <div className='options'>
            <div className='radio__wrapper'>
              <input
                type='radio'
                name='single'
                id='single'
                checked={selectedType === 'single'}
                onChange={handleTeamTypeChange}
                className='radio'
              />
              <label htmlFor='single'>Single</label>
            </div>

            <div className='radio__wrapper'>
              <input
                type='radio'
                name='team'
                id='team'
                checked={selectedType === 'team'}
                onChange={handleTeamTypeChange}
                className='radio'
              />
              <label htmlFor='team'>Team</label>
            </div>
          </div>
          {disabled && <h1> You have booked a slot</h1>}
          {!disabled && (
            <>
              <table className='student__table'>
                <thead>
                  <tr style={{ padding: '4px' }}>
                    <th>No</th>
                    <th>Name</th>
                    <th>Roll</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedType === 'single' && (
                    <tr>
                      <td>1</td>
                      <td>
                        <input
                          name='name'
                          className='secondary'
                          onChange={(e) =>
                            handleChange(e, studentDetails[0].id)
                          }
                          value={studentDetails[0].name}
                        />
                      </td>
                      <td>
                        <input
                          name='roll'
                          className='secondary'
                          onChange={(e) =>
                            handleChange(e, studentDetails[0].id)
                          }
                          value={studentDetails[0].roll}
                        />
                      </td>
                    </tr>
                  )}
                  {selectedType === 'team' &&
                    studentDetails.map(({ id, name, roll }, i) => (
                      <tr key={id}>
                        <td>{i + 1}</td>
                        <td>
                          <input
                            name='name'
                            className='secondary'
                            onChange={(e) => handleChange(e, id)}
                            value={name}
                          />
                        </td>
                        <td>
                          <input
                            name='roll'
                            className='secondary'
                            onChange={(e) => handleChange(e, id)}
                            value={roll}
                          />
                        </td>
                        <td>
                          {i !== 0 && (
                            <button
                              className='secondary'
                              onClick={() => handleRemove(id)}
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {selectedType === 'team' && (
                <button
                  disabled={studentDetails.length === 3}
                  onClick={handleClick}
                >
                  Add another Student
                </button>
              )}
            </>
          )}

          {!disabled && (
            <div className='slot__wrapper'>
              <label htmlFor='slot'> Select a slot</label>
              <select
                id='slot'
                className='select'
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {slots.initialSlots
                  .filter((s) => s.slots_left !== 0)
                  .map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      Day: {slot.day.toUpperCase()} Slot {slot.id.split('')[3]}:{' '}
                      {slot.start_time} - {slot.end_time}, {slot.slots_left}{' '}
                      left{' '}
                    </option>
                  ))}
              </select>
              <button disabled={disabled} onClick={handleSlotBook}>
                Book Slot
              </button>
            </div>
          )}
        </div>
      )}
      <button onClick={goToHome}>Go Home</button>
    </div>
  )
}
