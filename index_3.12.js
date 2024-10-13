const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

const password = process.argv[2];

const url = `mongodb+srv://saarauusitalo:${password}@phonebook.xdpqv.mongodb.net/phonebookDB?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// GET ALL ENTRIES

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

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

// // DELETE ENTRY

// app.delete('/api/persons/1', (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);
//   response.status(204).end();
// });

// // ADD ENTRY

// const generateId = () => Math.floor(Math.random() * 404) + 5;

// app.post('/api/persons', (request, response) => {
//   const body = request.body;
//   console.log(body);

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'name or number missing',
//     });
//   }

//   if (persons.some((person) => person.name === body.name)) {
//     return response.status(400).json({
//       error: 'name must be unique',
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateId(),
//   };

//   persons = persons.concat(person);
//   response.json(person);
// });
