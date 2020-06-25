import React, { useState, useRef } from 'react';

const FlightBooker = () => {
  const [flightType, setFlightType] = useState('one-way');
  const [flightOut, setFlightOut] = useState('');
  const [flightBack, setFlightBack] = useState('');
  const [error, setError] = useState(false);
  const flightOutRef = useRef();
  const returnFlightRef = useRef();

  const changeFlightType = (e) => {
    setFlightType(e.target.value);
    // Disable return flight field only if flightType is 'one-way'
    if (e.target.value === 'return') {
      returnFlightRef.current.disabled = false;
    } else {
      returnFlightRef.current.disabled = true;
    }
  };

  const changeFlightOut = (e) => {
    // use regex to match approved date format of MM-DD-YYYY
    // if it does not match, use 'flightOut' ref to highlight input as having an error, and setError to true
  };

  const changeReturnFlight = (e) => {
    // use regex to match approved date format of MM-DD-YYYY
    // if it does not match, use 'flightOut' ref to highlight input as having an error, and setError to true
  };

  const handleSubmit = (e) => {
    //check if error === true, and alert
    //otherwise alert with flight details
  };

  return (
    <div className='box'>
      <p className='box-heading'>Flight Booker</p>
      <form id='flight-booker'>
        <select
          name='flight-type'
          value={flightType}
          onChange={changeFlightType}
        >
          <option value='one-way'>One Way Flight</option>
          <option value='return'>Return Flight</option>
        </select>
        <input
          type='text'
          id='flight-out'
          placeholder='06-24-2020'
          ref={flightOutRef}
        />
        <input
          type='text'
          id='flight-back'
          placeholder='06-25-2020'
          ref={returnFlightRef}
          disabled
        />
        <button type='submit'>Book Flight</button>
      </form>
    </div>
  );
};

export default FlightBooker;
