import React, { useState, useCallback } from 'react';
import { useKeyPressEvent } from 'react-use';
import OverlayContext from 'context/OverlayContext';
import Overlay from 'components/Overlay';
import Entry from 'components/Scene/Entry';
import SceneList, { SceneCount, SceneNames } from 'components/Scene/SceneList';
import CameraFeed from 'components/CameraFeed';
import './App.css';

function App({ children }) {
  const [initiated, setInitiated] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [uniqueState, setUniqueState] = useState();
  const [cameraStream, setCameraStream] = useState(null);
  // const [scrollStartTime, setScrollStartTime] = useState(null);

  const scrollRight = useCallback((length = 1) => {
    if (scroll <= -1 * (SceneCount - 1) || (!initiated)) return;
    if (scrollEnabled) {
      setScrollEnabled(false);
      setScroll(Math.max(scroll - length, -1 * (SceneCount - 1)));
      setTimeout(() => {
        setScrollEnabled(true);
      }, 250);
    }
  }, [initiated, scroll, scrollEnabled]);

  const scrollLeft = useCallback((length = 1) => {
    if (scroll >= -1) return;
    if (scrollEnabled) {
      setScrollEnabled(false);
      setScroll(Math.min(scroll + length, -1));
      setTimeout(() => {
        setScrollEnabled(true);
      }, 250);
    }
  }, [scroll, scrollEnabled]);

  // const handleWheel = (event) => {
  //   const currentTime = new Date().getTime();
  //
  //   if (scrollStartTime !== 'undefined') {
  //     const timeDiff = currentTime - scrollStartTime;
  //     const threshold = 40;
  //
  //     if (timeDiff > 250) {
  //       if ((event.deltaY > threshold || event.deltaX > threshold)) {
  //         scrollRight();
  //       } else if ((event.deltaY < threshold * -1 || event.deltaX < threshold * -1)) {
  //         scrollLeft();
  //       }
  //     }
  //   }
  //
  //   setScrollStartTime(currentTime);
  // };

  const handleArrowRight = () => {
    if (document.activeElement.tagName !== 'INPUT') scrollRight();
  };
  const handleArrowLeft = () => {
    if (document.activeElement.tagName !== 'INPUT') scrollLeft();
  };

  const init = () => {
    const cb = () => {
      setInitiated(true);
      setScrollEnabled(true);
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setCameraStream(stream);
        cb();
      })
      .catch((err) => {
        cb();
      })
  };

  useKeyPressEvent('ArrowRight', handleArrowRight, () => {});
  useKeyPressEvent('ArrowLeft', handleArrowLeft, () => {});

  return (
    <OverlayContext.Provider value={{
      initiated,
      index: Math.abs(scroll),
      scene: (initiated) ? SceneNames[Math.abs(scroll)] : 'index',
      lastIndex: SceneCount,
      cameraStream,
      setCameraStream,
      uniqueState,
      setUniqueState
    }}>
      <div
        className="App"
        // onWheel={handleWheel}
        style={{ transform: `translateX(${scroll * 100}vw)` }}
      >
        <Entry callback={init} />
        {initiated && (<SceneList />)}
      </div>
      <Overlay
        callbacks={{
          modal() { setScrollEnabled(false); },
          dismissModal() { setScrollEnabled(true); },
          prev() { scrollLeft(); },
          next() { scrollRight(); },
          leave() { setScroll(0); }
        }}
      />
      {initiated && (<CameraFeed stream={cameraStream} />)}
    </OverlayContext.Provider>
  );
}

export default App;
