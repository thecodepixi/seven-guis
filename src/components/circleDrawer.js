import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

const SizeModal = React.forwardRef((props, modal) => {
  const [radius, setRadius] = useState(10);

  const handleChange = (e) => {
    e.stopPropagation();
    setRadius(e.target.value);
    props.circle.style.height = radius * 2 + 'px';
    props.circle.style.width = radius * 2 + 'px';
  };

  return (
    <div
      id='circle-adjustment'
      onClick={props.modalClicks}
      ref={modal}
      style={{
        top: props.coords[1] + 10 + 'px',
        left: props.coords[0] + 10 + 'px',
      }}
    >
      <p>Adjust Diameter</p>
      <input type='range' max='100' value={radius} onChange={handleChange} />
    </div>
  );
});

const CircleDrawer = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [previousCircles, setPreviousCircles] = useState([]);
  const [removedCircles, setRemovedCircles] = useState([]);

  const canvas = useRef();
  const modal = useRef();

  const undo = () => {
    if (!currentCircle) return;
    currentCircle.remove();
    setCurrentCircle(previousCircles[previousCircles.length - 1]);
    setRemovedCircles(
      removedCircles.concat(previousCircles[previousCircles.length - 1])
    );
    setPreviousCircles(previousCircles.slice(0, -1));
  };

  const redo = () => {
    if (!removedCircles) return;
    let recentlyRemoved = removedCircles[removedCircles.length - 1];
    // canvas.current.appendChild(replacementCircle);
    // setCurrentCircle(replacementCircle);
    // setRemovedCircles(removedCircles.slice(0, -1));
  };

  const drawCircle = (e) => {
    if (showModal && modal.current.contains(e.target)) {
      return;
    }

    if (showModal && !modal.current.contains(e.target)) {
      setShowModal(false);
      return;
    } else {
      e.stopPropagation();

      let x = e.pageX;
      let y = e.pageY;

      let circ = document.createElement('div');
      circ.className = 'circ';
      circ.style.left = x - 10 + 'px';
      circ.style.top = y - 10 + 'px';

      circ.addEventListener('click', (e) => {
        e.stopPropagation();
        setCurrentX(e.pageX);
        setCurrentY(e.pageY);
        setShowModal(true);
        setCurrentCircle(circ);
      });

      setPreviousCircles(previousCircles.concat(currentCircle));
      setCurrentCircle(circ);
      console.log('Current Circle:', currentCircle);
      console.log('Previous Circles: ', previousCircles);
      canvas.current.appendChild(circ);
    }
  };

  return (
    <div className='box'>
      <p className='box-heading'>Circle Drawer</p>
      <div id='circle-buttons'>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div id='circle-canvas' ref={canvas} onClick={drawCircle}>
        {showModal ? (
          <SizeModal
            showModal={setShowModal}
            ref={modal}
            coords={[currentX, currentY]}
            circle={currentCircle}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CircleDrawer;
