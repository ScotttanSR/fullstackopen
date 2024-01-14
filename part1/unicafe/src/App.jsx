import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </>
  )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const average = ((props.good*1) + (props.neutral*0) + (props.bad*-1))/ total
  
  if (total == 0) {
    return (
      <> 
        <h1>statistics</h1>
        <p>no feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={total} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={average * 100} />
      </table>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={()=> props.handleClick(props.text)}>{props.text}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleOnClick = (props) => {
    if (props == 'good') {
      const newCount = good + 1
      setGood(newCount)
    } else if (props == 'neutral') {
      const newCount = neutral + 1
      setNeutral(newCount)
    } else {
      const newCount = bad + 1
      setBad(newCount)
    }
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} handleClick={handleOnClick}/>
      <Button text={'bad'} handleClick={handleOnClick}/>
      <Button text={'neutral'} handleClick={handleOnClick}/>
      <Statistics
        good = {good}
        bad = {bad}
        neutral = {neutral}
      />
    </div>
  )
}

export default App