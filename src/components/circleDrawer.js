import React, { useState, useRef } from 'react';

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
        top: props.coords[1] + 'px',
        left: props.coords[0] + 'px',
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
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [previousCircles, setPreviousCircles] = useState([]);
  const [removedCircles, setRemovedCircles] = useState([]);

  const canvas = useRef();
  const modal = useRef();

  /* undo method checks for a current circle, then, if we have one:
   * we remove it from the canvas
   * add the removed circle to removedCircles
   * set the currentCircle to the most recent previous
   * remove the last previous circle from previousCircles since it's now current
   */
  const undo = () => {
    if (!currentCircle) return;
    currentCircle.remove();
    setRemovedCircles(removedCircles.concat(currentCircle));
    setCurrentCircle(previousCircles[previousCircles.length - 1]);
    setPreviousCircles(previousCircles.slice(0, -1));
  };

  /* first we check if we have any removedCircles that we can add back then:
   * we add the last removedCircle back to the canvas
   * we add whatever the currentCircle was to previousCircles
   * we make the circle we added back the currentCircle
   * then we update removedCircles to take away the one we added back
   */

  const redo = () => {
    if (removedCircles.length === 0) return;
    canvas.current.appendChild(removedCircles[removedCircles.length - 1]);
    setPreviousCircles(previousCircles.concat(currentCircle));
    setCurrentCircle(removedCircles[removedCircles.length - 1]);
    setRemovedCircles(removedCircles.slice(0, -1));
  };

  const drawCircle = (e) => {
    // handle modal clicking if modal is currently up
    if (showModal && modal.current.contains(e.target)) {
      return;
    }
    if (showModal && !modal.current.contains(e.target)) {
      setShowModal(false);
      return;
    } else {
      // otherwise deal with creating a circle
      e.stopPropagation();

      // get mouse click location relative to "client",
      // which for some reason is #box and not #circle-canvas
      let canvasBounds = canvas.current.getBoundingClientRect();
      let x = e.clientX - canvasBounds.left;
      let y = e.clientY - canvasBounds.top;

      let circ = document.createElement('div');
      circ.className = 'circ';
      circ.style.left = x + 'px';
      circ.style.top = y + 'px';

      circ.addEventListener('click', (e) => {
        e.stopPropagation();
        setCurrentX(e.clientX - canvasBounds.left);
        setCurrentY(e.clientY - canvasBounds.top);
        setShowModal(true);
        setSelectedCircle(circ);
      });

      // if we have a current circle, add it to the previousCircles array
      if (currentCircle) {
        setPreviousCircles(previousCircles.concat(currentCircle));
      }
      // if we've removed any circles with undo, get rid of them, so we can't "redo" them anymore
      if (removedCircles.length > 0) {
        setRemovedCircles([]);
      }
      // make the created circle the current circle and append it to the canvas
      circ.id = `circle-${previousCircles.length + 1}`;
      setCurrentCircle(circ);
      canvas.current.appendChild(circ);
    }
  };

  return (
    <div className='box'>
      <p className='box-heading'>Circle Drawer</p>
      <div id='circle-canvas' ref={canvas} onClick={drawCircle}>
        {showModal ? (
          <SizeModal
            showModal={setShowModal}
            ref={modal}
            coords={[currentX, currentY]}
            circle={selectedCircle}
            canvas={canvas.current}
          />
        ) : null}
      </div>
      <div id='circle-buttons'>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
    </div>
  );
};

export default CircleDrawer;
