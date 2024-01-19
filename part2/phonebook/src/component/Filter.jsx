const Filter = (props) => {
    const {handleOnChangeFilter, filteredPersons} = props
    return (
      <p>filter shown with <input onChange={handleOnChangeFilter} value={filteredPersons}/></p>
    )
  }

  export default Filter 