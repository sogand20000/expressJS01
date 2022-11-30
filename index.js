const { request, response } = require('express')
const express = require('express')
const Joi = require('joi')
const app = express()
app.use(express.json())
const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
]

app.get('/', (req, res) => res.send('Hello 10  Word'))
app.get('/api/courses', (req, res) => {
  res.send(courses)
})
app.get('/api/courses/:id', (request, response) => {
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
  //validation
  const { error } = validateCoures(request.body)

  if (error) {
    response.status(400).send(error.details[0].message)
    return
  }
  const course = {
    id: courses.length + 1,
    name: request.body.name,
  }
  courses.push(course)
  response.send(courses)
})

//update
app.put('/api/courses/:id', (request, response) => {
  //Look up the course  //If not existing ,return 404

  const course = courses.find((x) => x.id === parseInt(request.params.id))
  if (!course) {
    response.status(404).send('The course with the given ID was not found')
    return
  }
  //validate //If invalid ,return 400 -Bad request

  const { error } = validateCoures(request.body)
  console.log(error)
  if (error) {
    response.status(400).send(error.details[0].message)
    return
  }

  //Update course

  course.name = request.body.name
  response.send(course)
  //Return the updated course
})

var port = process.env.PORT || '3000'
app.listen(port, () => console.log(`server is running on ${port}`))

function validateCoures(course) {
  debugger
  console.log(course)
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  })

  return schema.validate(course)
}
