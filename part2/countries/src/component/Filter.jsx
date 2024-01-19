const Filter = (props) => {
    const {handleOnChangeFilter, filteredCountries} = props
    return (
      <p>find countries<input onChange={handleOnChangeFilter} value={filteredCountries}/></p>
    )
  }

  export default Filter