const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGoodValue = state.good + 1;
      return {...state, good:newGoodValue }
    case 'OK':
      const newOkValue = state.ok + 1;
      return {...state, ok:newOkValue}
    case 'BAD':
      const newBadValue = state.bad + 1;
      return {...state, bad:newBadValue}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
