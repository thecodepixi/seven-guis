import React from 'react';
import './App.css';
import Counter from './components/counter';
import TempConverter from './components/tempConverter';

function App() {
  return (
    <div className='App'>
      <h1>Seven GUIs</h1>
      <div id='guis'>
        <Counter />
        <TempConverter />
      </div>
    </div>
  );
}

export default App;
