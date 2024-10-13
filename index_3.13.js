require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/persons');

app.use(express.json());
app.use(morgan('tiny'));

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on poooooort ${PORT}`);

// GET ALL ENTRIES

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// ADD ENTRY

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// DELETE ENTRY

// GET INFO

// app.get('/info', (request, response) => {
//   response.status(200).send(
//     `<p>Phonebook has info for ${persons.length} people</p>
//     <p>${new Date()}</p>`
//   );
// });

// // GET INDIVIDUAL ENTRIES

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);

//   if (!person) {
//     return response.status(404).send(`<h3>404 - person not found</h3>`);
//   }

//   response.json(person);
// });
