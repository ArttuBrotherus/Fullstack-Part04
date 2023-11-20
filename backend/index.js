require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')
const { getAll, create, deleteBlog } = require('./models/blogSer')

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

app.delete('/api/blogs/:id', async (request, response) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  updBlg = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, updBlg)
  response.json(updBlg)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app