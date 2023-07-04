const init = () => {
  const date = new Date()
  let currentDate = date.toLocaleDateString()
  let currentTime = date.toLocaleTimeString()

  return {
    currentDate,
    currentTime,
  }
}
module.exports = { init }
