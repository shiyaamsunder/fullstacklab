function daysleft(startdate, enddate) {
  let start
  let end
  if (!enddate) {
    start = new Date().getTime()
    end = new Date(startdate).getTime()
  } else {
    start = new Date(startdate).getTime()
    end = new Date(enddate).getTime()
    if (start > end) {
      console.log(start, end)
      throw new Error('Start date should be less than the End Date')
    }
  }

  let remaining = ((end - start) / (1000 * 60 * 60 * 24)).toFixed(1)
  return remaining > 0 ? Number(remaining) : 0
}
module.exports = daysleft
