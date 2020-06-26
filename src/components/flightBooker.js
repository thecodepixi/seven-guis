import React, { useState, useRef } from 'react';

const FlightBooker = () => {
  const [flightType, setFlightType] = useState('one-way');
  const [flightOut, setFlightOut] = useState('');
  const [flightBack, setFlightBack] = useState('');
  const [error, setError] = useState({ flightOut: false, flightBack: false });
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

  const dateRegExp = /^((0){1}[1-9]{1}|(1){1}[0-2]{1})-(([0]{1}[1-9]{1})|([12]{1}[0-9]{1})|3[01])-20[\d]{2}$/g;

  const changeFlightOut = (e) => {
    // use regex to match approved date format of MM-DD-YYYY
    if (dateRegExp.test(e.target.value) || e.target.value === '') {
      setError((prev) => ({
        ...prev,
        flightOut: false,
      }));
      setFlightOut(e.target.value);
    } else {
      // if it does not match, use 'flightOut' ref to highlight input as having an error, and setError to true
      setError((prev) => ({
        ...prev,
        flightOut: true,
      }));
      setFlightOut(e.target.value);
    }
  };

  const changeReturnFlight = (e) => {
    // use regex to match approved date format of MM-DD-YYYY
    if (dateRegExp.test(e.target.value) || e.target.value === '') {
      setError((prev) => ({
        ...prev,
        flightBack: false,
      }));
      setFlightBack(e.target.value);
    } else {
      // if it does not match, use 'flightOut' ref to highlight input as having an error, and setError to true
      setError((prev) => ({
        ...prev,
        flightBack: true,
      }));
      setFlightBack(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //check if error === true, and alert
    //check flightType
    if (flightType === 'one-way') {
      if (error.flightOut || flightOut === '') {
        alert(`Please choose a valid flight date.`);
      } else {
        alert(`Your flight has been booked for ${flightOut}`);
        setFlightOut('');
      }
    } else {
      if (error.flightOut || error.flightBack) {
        alert(
          `Please choose a valid date for your ${
            error.flightOut ? 'flight out' : 'flight back'
          }.`
        );
      } else if (flightOut === '' || flightBack === '') {
        alert(`Please fill in your flight dates.`);
      } else {
        alert(`Your flight has been booked for ${flightOut} - ${flightBack}`);
        setFlightOut('');
        setFlightBack('');
      }
    }
  };

  return (
    <div className='box'>
      <p className='box-heading'>Flight Booker</p>
      <form id='flight-booker' onSubmit={handleSubmit}>
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
          onChange={changeFlightOut}
          className={error.flightOut ? 'error-field' : null}
          value={flightOut}
        />
        <input
          type='text'
          id='flight-back'
          placeholder='06-25-2020'
          ref={returnFlightRef}
          value={flightBack}
          onChange={changeReturnFlight}
          className={error.flightBack ? 'error-field' : null}
          disabled
        />
        <button type='submit'>Book Flight</button>
      </form>
    </div>
  );
};

export default FlightBooker;
