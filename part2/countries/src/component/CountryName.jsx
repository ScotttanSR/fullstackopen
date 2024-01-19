const CountryName = (props) => {

    if (props.country.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if ( props.country.length > 1 && props.country.length <=10){
        return (
          <>
            {props.country.map((c) => 
              <div key={c}>
                {c} <button onClick={()=> props.showCountry(c)}>show</button>
                <br/>
              </div>
            )}
          </>
        )
    } else if (props.country.length == 0){
        return (
          <p>country not found</p>
        )
    }
  }

  export default CountryName