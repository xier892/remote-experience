import React, { useState, useContext, useRef } from 'react';
import { useWindowSize, useEffectOnce } from 'react-use';
import SceneVisible from 'context/SceneVisible';
import useMousePosition from 'api/useMousePosition';
import playAudioInstance from 'api/playAudioInstance';
import map from 'api/map';
import audio from 'media/audio/open';
import './eyeball.css';

function Eyeball({ openDelay = 1, twitchDelay = 0, sclera = '#fffad6', eyelid = '#10493a', iris = ['#c17ace', '#391c3d'] }) {
  const visible = useContext(SceneVisible);
  const irisContainer = useRef(null);

  const [initiated, setInitiated] = useState(false);
  const [opened, setOpenedState] = useState(false);
  const [trackMouse, setTrackMouse] = useState(false);

  const { x, y } = useMousePosition();
  const hasPointer = ('matchMedia' in window && matchMedia('(pointer:fine)').matches);
  const { width, height } = useWindowSize();

  const getClassName = (className) => {
    if (initiated) {
      className += ' initiated';
    }
    if (opened) {
      className += ' opened';
    }
    return className;
  };

  const playAudio = () => {
    if (!opened) playAudioInstance(audio);
  };

  useEffectOnce(() => {
    const enableTracking = () => {
      window.removeEventListener('mousemove', enableTracking, false);
      setTrackMouse(true);
    };

    window.addEventListener('mousemove', enableTracking, false);

    if (!SceneVisible) {
      window.removeEventListener('mousemove', enableTracking, false);
    }
  });

  return (
    <div
      className="eyeball"
      style={{ animationDelay: `${openDelay}s` }}
    >
      <div className={getClassName('sclera')} style={{
        backgroundColor: sclera,
        animationDelay: `${twitchDelay}s`,
        animationPlayState: (opened) ? '' : 'paused'
      }} />
      <div className={getClassName('iris')} style={{
        animationDelay: `${twitchDelay}s`,
        animationPlayState: (opened) ? '' : 'paused'
      }}>
        <div
          className="irisContainer"
          ref={irisContainer}
        >
          <div
            className={getClassName('svgContainer irisController')}
            style={{
              transform: (trackMouse && visible && hasPointer) ? `translate(${map(x, 0, width, -30, 30)}%, ${map(y, 0, height, -10, 10)}%)` : 'translate(0)'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g transform="translate(-133 -59)"><circle cx="40" cy="40" r="40" transform="translate(133 59)" fill={iris[0]}/><circle cx="20" cy="20" r="20" transform="translate(153 79)" fill={iris[1]}/></g></svg>
          </div>
        </div>
      </div>
      <div
        className={getClassName('svgContainer eyelid')}
        style={{
          animationDelay: `${twitchDelay}s`,
          animationPlayState: (opened) ? '' : 'paused'
        }}
        onTransitionEnd={() => setOpenedState(true)}
      >
        <div className="topLid" style={{ backgroundColor: eyelid }} />
          <svg xmlns="http://www.w3.org/2000/svg" width="346" height="195.001" viewBox="0 0 346 195.001"><path d="M102-1009H-244v-195H102v195ZM-70.75-1164c-36.386,0-69.6,20.712-86.69,54.054a9.891,9.891,0,0,0,0,8.894c17.088,33.341,50.305,54.052,86.69,54.052s69.6-20.713,86.69-54.055a9.9,9.9,0,0,0,0-8.894C-1.148-1143.289-34.365-1164-70.75-1164Z" transform="translate(244 1204)" fill={eyelid}/></svg>
        <div className="bottomLid" style={{ backgroundColor: eyelid }} />
      </div>
      {!initiated && (<div
        className={getClassName('eyeflap')}
        style={{ animationDelay: `${openDelay}s` }}
        onAnimationEnd={() => {
          setInitiated(true);
          playAudio();
        }}
        />)}
    </div>
  );
}

export default Eyeball;
