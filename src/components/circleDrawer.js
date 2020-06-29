import React, { useState, useRef, useEffect } from 'react';

const SizeModal = React.forwardRef((props, modal) => {
  return (
    <div id='circle-adjustment' ref={modal} onClick={props.modalClicks}>
      <p>Adjust Diameter</p>
      <input type='range' max='100' />
    </div>
  );
});

const CircleDrawer = () => {
  const [showModal, setShowModal] = useState(false);
  const canvas = useRef();
  const modal = useRef();

  const drawCircle = (e) => {
    if (showModal && modal.current.contains(e.target)) {
      return;
    }

    if (showModal && !modal.current.contains(e.target)) {
      setShowModal(false);
      return;
    } else {
      e.stopPropagation();
      let x = e.pageX - 10;
      let y = e.pageY - 10;

      let circ = document.createElement('div');
      circ.className = 'circ';
      circ.style.left = x + 'px';
      circ.style.top = y + 'px';
      circ.addEventListener('click', (e) => {
        e.stopPropagation();
        setShowModal(true);
      });
      canvas.current.appendChild(circ);
    }
  };

  return (
    <div className='box'>
      <p className='box-heading'>Circle Drawer</p>
      <div id='circle-buttons'>
        <button>Undo</button>
        <button>Redo</button>
      </div>
      <div id='circle-canvas' ref={canvas} onClick={drawCircle}>
        {showModal ? <SizeModal showModal={setShowModal} ref={modal} /> : null}
      </div>
    </div>
  );
};

export default CircleDrawer;
