import { useState } from 'react'

const MostVote = (props) => {

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdote}</p>
      <p>has {props.points} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  
  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }

  const max = Math.max(...points)
  const maxAnecdotesNum = points.indexOf(max)

  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <br/>
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <MostVote anecdote={anecdotes[maxAnecdotesNum]} points={points[maxAnecdotesNum]}/>
    </div>
  )
}

export default App