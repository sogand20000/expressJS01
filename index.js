const express = require('express')
const app = express()
app.use(express.json())
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]
app.get('/', (req, res) => res.send('Hello 10  Word'))
/* app.get('/api/courese', (req, res) => {
  res.send([1, 2, 3])
}) */
app.get('/api/courese/:id', (request, response) => {
  response.send(request.params.id)
})
app.get('/api/posts/:year/:month', (request, response) => {
  /*  response.send(request.params) */
  response.send(request.query) //http://localhost:3000/api/posts/1/2?sortBy=name
})
app.get('/api/courses/:id', (request, response) => {
  const course = courses.find((c) => c.id === parseInt(request.params.id))
  if (!course)
    response.status(404).send('The course with the given ID was not found')
  response.send(course)
})
app.post('/api/courses', (request, response) => {
  if (!request.body.name || request.body.name.length < 3)
    response.status(400).send('Name is required and should be minimumm 3 char')
  return
  const course = {
    id: courses.length + 1,
    name: request.body.name,
  }
  courses.push(course)
  response.send(courses)
})

var port = process.env.PORT || '3000'
app.listen(port, () => console.log(`server is running on ${port}`))
