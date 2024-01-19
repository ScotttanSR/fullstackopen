import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import CountryInfo from './component/CountryInfo'
import Filter from './component/Filter'
import CountryName from './component/CountryName'

function App() {
  const [country, setCountry] = useState([])
  const [filteredCountry, setFilteredCountry] = useState('')
  const [countryDetails, setCountryDetails] = useState('')
  const [apiCallMade, setApiCallMade] = useState(false)

  const handleOnChangeFilter = (event) => {
    setFilteredCountry(event.target.value)
  }

  const filteredCountries = useMemo(() => {
    return country.filter((c) => c.toLowerCase().includes(filteredCountry.toLowerCase()));
  }, [country, filteredCountry]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countries = response.data.map((country => country.name.common))
        setCountry(countries)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const fetchCountryDetails = async () => {
        try {
          const res = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`);
          setCountryDetails(res.data);
          setApiCallMade(true);
        } catch (error) {
          console.error('Error fetching country details:', error);
        }
      };

      fetchCountryDetails();
    }
  }, [filteredCountries, apiCallMade]);

  const showCountry = (country) => {
    setFilteredCountry(country)
  }

  return (
    <>
      <Filter handleOnChangeFilter={handleOnChangeFilter} filteredCountries={filteredCountry}/>
      <CountryName country={filteredCountries} showCountry={showCountry}/>
      {filteredCountries.length == 1 && <CountryInfo countryDetails={countryDetails}/>}
      
    </>
  )
}

export default App
