import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name !== '') {
            const getCountryDetails = async () => {
                try {
                    const countryDetails = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                    setCountry({...countryDetails, found: true})
                } catch (error) {
                    console.error('Error fetching country details:', error);
                    setCountry({found: false})
                }
            }
            getCountryDetails()
        }
    },[name])

    return {
        country,
    }
}