import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
import { useEffectOnce } from 'react-use';
import useMousePosition from 'api/useMousePosition';
import OverlayContext from 'context/OverlayContext';
import './cameraFeed.css';

function CameraVideo({ srcObject }) {
  const video = useRef(null);

  useEffect(() => {
    if (!video.current) return;
    video.current.srcObject = srcObject;
  }, [srcObject])

  return (
    <video ref={video} autoPlay muted
    />
  );
}

function CameraFeed({ stream }) {
  const { cameraStream, setCameraStream } = useContext(OverlayContext);

  const [mouseMoved, setMouseMoved] = useState(false);
  const [currentStream, setCurrentStream] = useState(stream);
  const [tracks, setTracks] = useState((stream) ? stream.getTracks() : null);
  const [detached, setDetached] = useState((!stream));

  const { x, y } = useMousePosition();
  const hasPointer = ('matchMedia' in window && matchMedia('(pointer:fine)').matches);

  const refresh = useCallback(() => {
    if (tracks && !detached) {
      for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'video' && tracks[i].readyState !== 'live') {
          navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            setCameraStream(stream);
            setTracks(stream.getTracks());
            setDetached(false);
            setCurrentStream(stream);
          })
          .catch((err) => {
            setDetached(true);
            setCameraStream(null);
          });
        }
      }
    }

    if (cameraStream && detached) {
      setDetached(false);
      setTracks(cameraStream.getTracks());
      setCurrentStream(cameraStream);
    }
  }, [cameraStream, detached, setCameraStream, tracks])

  useEffectOnce(() => {
    const enableTracking = () => {
      window.removeEventListener('mousemove', enableTracking, false);
      setMouseMoved(true);
    };

    window.addEventListener('mousemove', enableTracking, false);
  });

  useEffect(() => {
    refresh();
  });

  return (
    <OverlayContext.Consumer>
      {({ scene }) => (
        <div
          className={`cameraFeed${(hasPointer && !detached) ? '' : ' noPointer'}${(mouseMoved) ? ' active' : ''}${(scene === 'blackout') ? ' error' : ''}`}
          style={{ transform: (hasPointer && !detached) ? `translate(${x}px, ${y}px)` : 'translate(0)' }}
        >
          <CameraVideo srcObject={currentStream} />
        </div>)}
    </OverlayContext.Consumer>
    );
}

export default React.memo(CameraFeed);
