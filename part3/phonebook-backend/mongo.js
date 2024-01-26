const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://scott:${password}@cluster0.rltlihe.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

// const person = new Person({
//     name: 'Scott Tan',
//     number: '011-2313123',
// })

// person.save().then(result => {
//     console.log('person saved!')
//     mongoose.connection.close()
//   })
if (process.argv.length === 3 ) {
  console.log('phonebook')
  Person.find({}).then(result => {
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}else if (process.argv.length <= 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const personToSave = new Person({
    name: name,
    number: number,
  })
  personToSave.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}