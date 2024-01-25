import { useState, useEffect } from 'react'
import Filter from './component/Filter'
import Persons from './component/Persons'
import PersonForm from './component/PersonForm'
import Notification from './component/Notification'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const handleOnChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleOnChangeNum = (event) => {
    setNewNum(event.target.value)
  }
  const handleOnChangeFilter = (event) => {
    setFilteredPersons(event.target.value)
  }

  const filteredBook = persons.filter((person) => 
    person.name.toLowerCase().includes(filteredPersons.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    const newId = `${persons.length + 1}`
    const newPerson = {name: newName , number: newNum, id: newId}
    const personExist = persons.some((person) => person.name === newName)
    if (!personExist){
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setMessage(`Added ${newName}`)
          setIsError(false)
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const updatePerson = persons.find((person) => person.name === newName)
      personService
        .update(updatePerson.id, newPerson)
        .then(person => {
          setPersons(persons.map((p) => p.id !== updatePerson.id ? p : person))
        })
    }
    setNewName('')
    setNewNum('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
        .catch(() => {
          setMessage(`information of ${person.name} has already been removed from server`)
          setIsError(true)
      })
    }
  }

  useEffect(() => {
    personService
    .getAll()
    .then(persons => setPersons(persons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter handleOnChangeFilter={handleOnChangeFilter} filteredPersons={filteredPersons}/>
      <PersonForm 
        addPerson={addPerson}
        handleOnChangeName={handleOnChangeName}
        handleOnChangeNum={handleOnChangeNum}
        newName={newName}
        newNum={newNum}
      /> 
      <h2>Numbers</h2>
      <Persons persons={filteredBook} deletePerson={deletePerson} />
    </div>
  )
}

export default App