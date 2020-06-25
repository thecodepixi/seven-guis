import React, { useState } from 'react';

const TempConverter = () => {
  const [fahrenheit, setFahrenheit] = useState('');
  const [celcius, setCelcius] = useState('');

  const convertToC = (temp) => {
    return (temp * (9 / 5) + 32).toFixed(1);
  };

  const convertToF = (temp) => {
    return ((temp - 32) * (5 / 9)).toFixed(1);
  };

  const handleCelciusChange = (e) => {
    setCelcius(e.target.value);
    if (e.target.value === '') {
      setFahrenheit('');
    } else {
      let f = convertToC(e.target.value);
      setFahrenheit(f);
    }
  };

  const handleFahrenheitChange = (e) => {
    setFahrenheit(e.target.value);
    if (e.target.value === '') {
      setCelcius('');
    } else {
      let c = convertToF(e.target.value);
      setCelcius(c);
    }
  };

  return (
    <div className='box'>
      <p className='box-heading'>Temperature Converter</p>
      <p>
        <input
          type='text'
          value={fahrenheit}
          onChange={handleFahrenheitChange}
        />
        <label htmlFor='fahrenheit'> Fahrenheit = </label>
        <input type='text' value={celcius} onChange={handleCelciusChange} />
        <label htmlFor='celcius'> Celcius</label>
      </p>
    </div>
  );
};

export default TempConverter;
