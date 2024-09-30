import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";
import PersonForm from "./components/Personform";
import Numbers from "./components/Numbers";
import Notification from "./components/Notification";
import Header from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const headers = ["Phonebook", "Numbers"];

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    try {
      await personsService.deleteEntry(id);
      setPersons(persons.filter((person) => person.id !== id));
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }

    if (newName === "") return;

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data)); // using response.data will add id
      setMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <Header header={headers[0]} />
      <Notification message={message} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Header header={headers[1]} />
      <Numbers persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
