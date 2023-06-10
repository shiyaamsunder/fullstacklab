import './App.css'
import { useState } from 'react';


function Item({ message, value = 0.0 }) {
  return (

    <div className="item">
      <div className="item__left">
        {message}
      </div>
      <div className='item__right'>
        {value}
      </div>
    </div>

  )
}




function App() {

  const [units, setUnits] = useState(0.0);
  const [netAmount, setNetAmount] = useState(0);
  const [currentCharge, setCurrentCharge] = useState(0);


  const handleSubmit = () => {

    if (units == 0) {
      alert("Enter valid units");
      return
    }
    setNetAmount(calculateBill(units));
  }


  const calculateBill = () => {
    let subsidy = 250;
    let f = 0;
    if (units >= 0 && units <= 100) f = 0;
    else if (units > 100 && units <= 150) f = 100;
    else if (units > 150 && units <= 200) f = 100 + 3.75 * units;
    else if (units > 200 && units <= 350) f = 250;
    else if (units > 350 && units <= 400) f = 250 + 4 * units;
    else if (units > 400 && units <= 450) f = 300;
    else if (units > 450 && units <= 600) f = 300 + 4 * units;
    else f = 400 + 5 * (units - 600);

    console.log(f);

    if (f < 250) subsidy = 0;

    setCurrentCharge(f);
    return f + 50 - subsidy;
  }
  return (
    <>
      <main className="main__wrapper">

        <h1>Electricity Bill</h1>

        <div>
          <label>Enter the units: </label>
          <input type="number" onChange={(e) => setUnits(Number(e.target.value))} />
        </div>
        <button style={{ marginTop: "10px" }} onClick={handleSubmit}>Calculate</button>


        <div className="wrapper">
          <Item message="Consumed Units" value={units} />
          <Item message="Total Current Charge Rs:" value={currentCharge} />
          <Item message="Current Charge Rs." value={currentCharge} />
          <Item message="Fixed Cost Rs.(+)" value={50} />
          <Item message="Subsidy Fixed Cost Rs.(-)" />
          <Item message="New Subsidy Rs.(-)" value={250} />
          <Item message="Net Amount" value={netAmount} />

        </div>
      </main >
    </>
  )
}

export default App
