import { useContext } from 'react'
import './Slot.css'
import { SlotContext } from './SlotContext'

export default function Slot() {
  const slots = JSON.parse(localStorage.getItem('bookedslots')) || []
  const slotContext = useContext(SlotContext)
  const { initialSlots } = slotContext.slots || []

  const getSlotTimeValues = (id) => {
    let filteredSlot = initialSlots.filter((slot) => slot.id.includes(id))
    return filteredSlot
  }

  console.log(getSlotTimeValues('d1'))

  const getSlotDetails = (id) => {
    return [].concat(
      ...slots.filter((slot) => slot.id.includes(id)).map((s) => s.team)
    )
  }

  console.log(getSlotDetails('d1'))
  return (
    <table className='slottable'>
      <thead>
        <tr>
          <td>Day/Slot</td>
          <td>Slot 1</td>
          <td>Slot 2</td>
          <td>Slot 3</td>
          <td>Slot 4</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          {getSlotTimeValues('d1').map((slot, i) => (
            <td key={slot.id}>
              <div className='item'>
                <div className='top'>
                  {slot.start_time} - {slot.end_time}
                </div>
                <div className='bottom'>
                  {i == 0 &&
                    getSlotDetails('d1s1')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 1 &&
                    getSlotDetails('d1s2')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 2 &&
                    getSlotDetails('d1s3')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 3 &&
                    getSlotDetails('d1s4')
                      .map((t) => t.roll)
                      .join(',')}
                </div>
              </div>
            </td>
          ))}
        </tr>
        <tr>
          <td>Tuesday</td>
          {getSlotTimeValues('d2').map((slot, i) => (
            <td key={slot.id}>
              <div className='item'>
                <div className='top'>
                  {slot.start_time} - {slot.end_time}
                </div>
                <div className='bottom'>
                  {i == 0 &&
                    getSlotDetails('d2s1')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 1 &&
                    getSlotDetails('d2s2')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 2 &&
                    getSlotDetails('d2s3')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 3 &&
                    getSlotDetails('d2s4')
                      .map((t) => t.roll)
                      .join(',')}
                </div>
              </div>
            </td>
          ))}
        </tr>
        <tr>
          <td>Wednesday</td>
          {getSlotTimeValues('d3').map((slot, i) => (
            <td key={slot.id}>
              <div className='item'>
                <div className='top'>
                  {slot.start_time} - {slot.end_time}
                </div>
                <div className='bottom'>
                  {i == 0 &&
                    getSlotDetails('d3s1')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 1 &&
                    getSlotDetails('d3s2')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 2 &&
                    getSlotDetails('d3s3')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 3 &&
                    getSlotDetails('d3s4')
                      .map((t) => t.roll)
                      .join(',')}
                </div>
              </div>
            </td>
          ))}
        </tr>
        <tr>
          <td>Thursday</td>
          {getSlotTimeValues('d4').map((slot, i) => (
            <td key={slot.id}>
              <div className='item'>
                <div className='top'>
                  {slot.start_time} - {slot.end_time}
                </div>
                <div className='bottom'>
                  {i == 0 &&
                    getSlotDetails('d4s1')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 1 &&
                    getSlotDetails('d4s2')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 2 &&
                    getSlotDetails('d4s3')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 3 &&
                    getSlotDetails('d4s4')
                      .map((t) => t.roll)
                      .join(',')}
                </div>
              </div>
            </td>
          ))}
        </tr>
        <tr>
          <td>Friday</td>
          {getSlotTimeValues('d4').map((slot, i) => (
            <td key={slot.id}>
              <div className='item'>
                <div className='top'>
                  {slot.start_time} - {slot.end_time}
                </div>
                <div className='bottom'>
                  {i == 0 &&
                    getSlotDetails('d5s1')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 1 &&
                    getSlotDetails('d5s2')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 2 &&
                    getSlotDetails('d5s3')
                      .map((t) => t.roll)
                      .join(',')}
                  {i == 3 &&
                    getSlotDetails('d5s4')
                      .map((t) => t.roll)
                      .join(',')}
                </div>
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
