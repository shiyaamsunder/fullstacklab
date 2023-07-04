// function daysleft(date) {
//   const today = new Date().getTime()
//   const lastDay = new Date(date).getTime()
//
//   let remainingDays = Math.round((lastDay - today) / (1000 * 60 * 60 * 24))
//
//   return remainingDays
// }

function daysleft(startdate, enddate) {
  let start = new Date(startdate).getTime()
  let end = new Date(enddate).getTime()
  if (!enddate) {
    start = new Date().getTime()
    end = new Date(startdate).getTime()
  }
  // const start = new Date(startdate).getTime()
  // const end = new Date(enddate).getTime()

  if (start > end) {
    throw new Error('Start date should be less than the End Date')
  }
  return Math.trunc((end - start) / (1000 * 60 * 60 * 24))
}
module.exports = daysleft
