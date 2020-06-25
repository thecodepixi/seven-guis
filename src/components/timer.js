import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [time, setTime] = useState(30);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timer = useRef();

  useEffect(() => {
    if (timeElapsed === time) {
      clearInterval(timer.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (time > 0) {
      timer.current = setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev < time) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer.current);
  });

  const resetTimer = () => {
    clearInterval(timer.current);
    setTime(0);
    setTimeElapsed(0);
  };

  return (
    <div className='box'>
      <p className='box-heading'>Timer</p>
      <progress id='time-elapsed' value={timeElapsed} max={time} />
      <label htmlFor='time-elapsed'>Time Elapsed: {timeElapsed} seconds</label>
      <input
        id='time'
        name='time'
        type='range'
        value={time}
        max='60'
        onChange={(e) => setTime(e.target.value)}
      />
      <label htmlFor='time'>Time: {time} seconds</label>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
};

export default Timer;
