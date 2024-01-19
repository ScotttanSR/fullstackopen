const PersonForm = (props) => {
    const {addPerson, handleOnChangeName, newName, handleOnChangeNum, newNum} = props
   return (
     <form onSubmit={addPerson}>
       <div>
         name: <input onChange={handleOnChangeName} value={newName} required/>
       </div>
       <div>
         number: <input onChange={handleOnChangeNum} value={newNum} required/>
       </div>
       <div>
         <button type="submit">add</button>
       </div>
     </form>
   )
 }

 export default PersonForm