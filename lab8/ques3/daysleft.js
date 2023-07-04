function daysleft(startdate, enddate) {
  let start = new Date(startdate).getTime()
  let end = new Date(enddate).getTime()
  if (!enddate) {
    start = new Date().getTime()
    end = new Date(startdate).getTime()
  }

  if (start > end) {
    throw new Error('Start date should be less than the End Date')
  }
  return Math.trunc((end - start) / (1000 * 60 * 60 * 24))
}
module.exports = daysleft
