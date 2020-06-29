import React, { useState } from 'react';

const CRUD = () => {
  const [names, setNames] = useState([
    {
      firstName: 'Emily',
      lastName: 'Pixi',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    {
      firstName: 'Groucho',
      lastName: 'Marx',
    },
  ]);
  const [firstName, setFirstName] = useState(names[0].firstName);
  const [lastName, setLastName] = useState(names[0].lastName);
  const [selectedName, setSelectedName] = useState(names[0]);
  const [nameFilter, setNameFilter] = useState('');

  const createPerson = () => {
    if (firstName !== '' && lastName !== '') {
      setNames(names.concat({ firstName: firstName, lastName: lastName }));
    }
  };

  const selectPerson = (person) => {
    setSelectedName(person);
    setFirstName(person.firstName);
    setLastName(person.lastName);
  };

  const updatePerson = () => {
    let personIndex = names.indexOf(selectedName);
    let updatedPerson = { firstName: firstName, lastName: lastName };
    setNames([
      ...names.slice(0, personIndex),
      updatedPerson,
      ...names.slice(personIndex + 1, names.length - 1),
    ]);
  };

  const deletePerson = () => {
    setNames(names.filter((name) => name !== selectedName));
    setFirstName(names[0].firstName);
    setLastName(names[0].lastName);
    setSelectedName(names[0]);
  };

  const filterNames = () => {
    return names.filter(
      (name) =>
        name.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        name.lastName.toLowerCase().includes(nameFilter.toLowerCase())
    );
  };

  const displayNames = nameFilter === '' ? names : filterNames();

  return (
    <div className='box'>
      <p className='box-heading'>CRUD</p>
      <div id='name-filter-container'>
        <label htmlFor='name-filter'>Filter Names: </label>
        <input
          name='name-filter'
          id='name-filter'
          type='text'
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </div>
      <div id='names-container'>
        <ul id='name-list'>
          {displayNames.map((person, idx) => (
            <li
              key={idx}
              onClick={() => selectPerson(person)}
              className={selectedName === person ? 'name-highlight' : null}
            >
              {person.lastName}, {person.firstName}
            </li>
          ))}
        </ul>
        <form id='names-form'>
          <label htmlFor='firstName'>First Name: </label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor='lastName'>Last Name: </label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </form>
      </div>
      <div id='crud-buttons'>
        <button onClick={createPerson}>Create</button>
        <button onClick={updatePerson}>Update</button>
        <button onClick={deletePerson}>Delete</button>
      </div>
    </div>
  );
};

export default CRUD;
