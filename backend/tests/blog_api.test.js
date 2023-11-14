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

afterAll(async () => {
  await mongoose.connection.close()
})