export default function AlarmItem({ time, active }) {
  return (
    <div className='alarm__item__wrapper'>
      <div className='alarm__item__time'> {time}</div>
      <div className='alarm__item__button'> {active}</div>
    </div>
  )
}
