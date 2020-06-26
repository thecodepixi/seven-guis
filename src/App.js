import React from 'react';
import './App.css';
import Counter from './components/counter';
import TempConverter from './components/tempConverter';
import FlightBooker from './components/flightBooker';
import Timer from './components/timer';
import CRUD from './components/CRUD';

function App() {
  return (
    <div className='App'>
      <h1>Seven GUIs</h1>
      <div id='guis'>
        <Counter />
        <TempConverter />
        <FlightBooker />
        <Timer />
        <CRUD />
      </div>
    </div>
  );
}

export default App;
