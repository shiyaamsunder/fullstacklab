import { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    months: 0,
    annual_salary: '',
    total_cost: '',
    portion_saved: '',
    down_payment: '',
  }

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { annual_salary, portion_saved, total_cost } = this.state
    console.log(annual_salary)

    if (portion_saved > 100) {
      alert('should be <= 100')
      return
    }

    if (
      annual_salary.toString().length < 1 ||
      total_cost.toString().length < 1 ||
      portion_saved.toString().length < 1
    ) {
      alert('Enter all the inputs')
      return
    }

    const down_payment = 0.25 * total_cost
    const savings_per_year = portion_saved * annual_salary
    const savings_per_month = savings_per_year / 12
    const total_months_needed = down_payment / savings_per_month

    this.setState({
      ...this.state,
      down_payment: down_payment,
      months: total_months_needed,
    })
  }
  render() {
    return (
      <>
        <main>
          <h1> Downpayment Calculator</h1>

          <div className='inputs'>
            <div className='input__wrapper'>
              <label className='input__label'>Annual Salary </label>
              <input
                className='input'
                value={this.state.annual_salary}
                name='annual_salary'
                onChange={this.handleChange}
                type='number'
              />
            </div>
            <div className='input__wrapper'>
              <label className='input__label'>Portion Saved</label>
              <input
                className='input'
                value={this.state.portion_saved}
                max={100}
                placeholder='Should be in percentage'
                name='portion_saved'
                onChange={this.handleChange}
                type='number'
              />
            </div>
            <div className='input__wrapper'>
              <label className='input__label'>Total cost of the House</label>
              <input
                className='input'
                value={this.state.total_cost}
                name='total_cost'
                onChange={this.handleChange}
                type='number'
              />
            </div>
          </div>

          <button onClick={this.handleSubmit}>Calculate</button>

          <div className='months'>
            <p>Down Payment : {this.state.down_payment}</p>
            Total Months: {Math.round(this.state.months)}
          </div>
        </main>
      </>
    )
  }
}
export default App
