import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className='box'>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>++</button>
    </div>
  );
};

export default Counter;
