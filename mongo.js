const mongoose = require('mongoose');
const numArguments = process.argv.length;

if (numArguments < 3) {
  console.log('give password as an argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://saarauusitalo:${password}@phonebook.xdpqv.mongodb.net/phonebookDB?retryWrites=true&w=majority&appName=phonebook`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (numArguments === 3) {
  console.log('phonebook:');
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error fetching people:', err);
      mongoose.connection.close();
    });
} else if (numArguments === 5) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];
  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${newName} number ${newNumber} to phonebook!`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error saving person:', err);
      mongoose.connection.close();
    });
}
