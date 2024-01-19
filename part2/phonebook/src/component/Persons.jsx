const Persons = (props) => {
    return (
      <>
        {props.persons.map((person) => 
          <p key={person.id}>{person.name} {person.number} 
            <button onClick={() => props.deletePerson(person)}>delete</button>
          </p>
        )}
      </>
    )
  }

  export default Persons