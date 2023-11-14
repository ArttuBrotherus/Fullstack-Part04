require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')
const { getAll, create } = require('./models/blogSer')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/blogs', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)

})

app.post('/api/blogs', async (request, response) => {

  body = request.body
  nBlog = await create({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  })
  response.status(201).json(nBlog)

})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app