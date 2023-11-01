const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('../phonebookFrontEnd/build'))

app.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {

    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }

  })

  .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name is missing' })
  }

  const n_person = new Person({
    name: body.name,
    number: body.number
  })

  n_person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})


const PORT = process.env.PORT
// 3001 (?)
// 80 (?)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})