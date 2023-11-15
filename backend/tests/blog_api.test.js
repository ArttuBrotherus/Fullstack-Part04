const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "Commentary on lackluster YouTube reaction channels",
    author: "K.C. Uno",
    url: "01/01",
    likes: 1
  },
  {
    title: "History of Python",
    author: "S.Y. Bidoss",
    url: "02/02",
    likes: 2
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('two blog posts in the json format', async () => {

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
  expect(() => JSON.stringify(response.body)).not.toThrow()

})

test('identifier property is id', async () => {

  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })

})

test('post request creates a new blog post', async () => {

  const newBlog = {
    "title": "Analysis on Paulie Gualtieri", 
    "author": "P.U. Kino",
    "url": "www/www",
    "likes": 33
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

})

afterAll(async () => {
  await mongoose.connection.close()
})