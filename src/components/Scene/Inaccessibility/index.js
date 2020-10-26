import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import { useIdle, useEffectOnce } from 'react-use';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import OverlayContext from 'context/OverlayContext';
import SceneVisible from 'context/SceneVisible';
import { ReactComponent as MicrophoneSlash } from 'media/image/microphone-slash.svg';
import { ReactComponent as Plane } from 'media/image/plane.svg';
import Pointer from 'media/image/inaccessible-mouse-pointer.svg';
import music from 'media/audio/tv-ambient';
import './inaccessibility.css';

function MicPlayground() {
  const sceneVisible = useContext(SceneVisible);

  const boundary = useRef(null);
  const mute = useRef(null);

  const idle = useIdle(10e3);

  const [boundaryDimensions, setBoundaryDimensions] = useState({});
  const [muteDimensions, setMuteDimensions] = useState({});
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);

  const escape = () => {
    const maxWidth = boundaryDimensions.width - muteDimensions.width;
    const maxHeight = boundaryDimensions.height - muteDimensions.height;
    const randX = Math.floor(Math.random() * maxWidth);
    const randY = Math.floor(Math.random() * maxHeight);
    const velocityX = randX - translate.x;
    const velocityY = randY - translate.y;
    const angle = Math.atan2(velocityY, velocityX) * 180 / Math.PI;

    if (sceneVisible) {
      setIsTransforming(true);
      setTranslate({ x: randX, y: randY });
      setRotate(angle);
    }
  };

  const resetState = useCallback(() => {
    setBoundaryDimensions({
      width: boundary.current.clientWidth,
      height: boundary.current.clientHeight
    });

    setMuteDimensions({
      width: mute.current.clientWidth,
      height: mute.current.clientHeight
    });

    setTranslate({
      x: -12,
      y: boundary.current.clientHeight - 80 + mute.current.clientHeight / 2
    });
  }, [boundary, mute]);

  useEffect(() => {
    if (idle) {
      resetState();
    }
  }, [idle, resetState]);

  useEffectOnce(() => {
    resetState();
  });

  return (
    <div
      className="muteIconBounds"
      ref={boundary}
      style={{ cursor: `url(${Pointer}), auto` }}
    >
      <div
        className="svgContainer muteIconContainer"
        onMouseEnter={escape}
        onClick={escape}
        style={{ transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg)` }}
        onTransitionEnd={() => {
          setIsTransforming(false);
          setRotate(0);
        }}
        ref={mute}
      >
        {(isTransforming) ? (<Plane />) : (<MicrophoneSlash />)}
      </div>
    </div>
  );
}

function Inaccessibility() {
  return (
    <Scene name="inaccessibility">
      <OverlayContext.Consumer>
        {({ uniqueState, setUniqueState }) => (
          <VolumeController
            audio={music}
            onIntersect={() => setUniqueState('inaccessibility')}
            onLeave={() => setUniqueState(null)}
          >
            <div className="blabber">
              <div className="eye"></div>
              <div className="eye"></div>
              <br />
              <div className="mouth" />
            </div>
          </VolumeController>
        )}
      </OverlayContext.Consumer>
      <MicPlayground />
    </Scene>
  );
}

export default React.memo(Inaccessibility);
