require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')
const { getAll, create } = require('./models/blogSer')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/blogs', (request, response) => {
  getAll().then(blogs => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  body = request.body
  create({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }).then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app