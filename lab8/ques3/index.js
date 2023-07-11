const mydate = require('./mydate')

const date = mydate.init()

console.log('Current Date: ', date.currentDate)
console.log('Current Time: ', date.currentTime)

console.log('\n')
const daysleft = require('./daysleft')

try {
  console.log('Days remaining from 10/07/2023', daysleft('07/10/2023'))
  console.log('Days remaining from 09/07/2023', daysleft('07/09/2023'))
  console.log('Days remaining from 09/07/2023', daysleft('07/05/2023'))

  console.log('\n')
  console.log(
    'Days remaining from 07/07/2023 to 10/07/2023',
    daysleft('07/10/2023', '07/14/2023')
  )
} catch (err) {
  console.log('Error: ', err.message)
}
