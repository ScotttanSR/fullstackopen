import { useState } from 'react'
import axios from 'axios'

const CountryInfo = (props) => {
    const {countryDetails} = props
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [weather, setWeather] = useState('')
    const api_key = import.meta.env.VITE_SOME_KEY
  if (countryDetails) {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryDetails.capitalInfo.latlng[0]}&lon=${countryDetails.capitalInfo.latlng[1]}&appid=${api_key}
    `)
      .then(res => {
        const degree = (res.data.main.temp - 273.15).toFixed(2)
        setTemperature(degree)
        setWind(res.data.wind.speed)
        setWeather(res.data.weather[0].icon)
      })
      const languages = Object
      .values(countryDetails.languages)
      .map(language => (<li key={language}>{language}</li>))

    return (
      <>
        <h1>{countryDetails.name.common}</h1>
        <p>capital: {countryDetails.capital}</p>
        <p>area: {countryDetails.area}</p>
        <br/>
        <b>languages:</b>
        <ul>
          {languages}
        </ul>
        <img src={countryDetails.flags.png}/>
        {temperature && wind && 
          <div>
            <h1>Weather in {countryDetails.capital}</h1>
            <p>temperature {temperature} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather}@2x.png`}/>
            <p>wind {wind} m/s</p>
          </div>
        }
      </>
    )
  } else {
    return null
  } 
}

export default CountryInfo