import React, { useContext, useState, useEffect, useRef } from 'react';
import { usePermission } from 'react-use';
import { Microphone, Video, MicrophoneSlash, VideoSlash } from 'media/image';
import { ReactComponent as Location } from 'media/image/location.svg';
import OverlayContext from 'context/OverlayContext';
import './top.css';

function Top() {
  const { index, scene } = useContext(OverlayContext);
  const currentScene = useRef(scene);
  const currentIndex = useRef(index);
  const [displayScene, setDisplayScene] = useState();
  const [initiated, setInitiated] = useState(false);

  const micPermission = usePermission({ name: 'microphone' });
  const videoPermission = usePermission({ name: 'camera' });

  const micPermissionGranted = (micPermission === 'granted');
  const videoPermissionGranted = (videoPermission === 'granted');

  let permissions = 'none';
  let permissionString = 'You are not sharing';

  if (micPermissionGranted && videoPermissionGranted) {
    permissions = 'both';
    permissionString = 'You are sharing and caring';
  } else if (
    (micPermissionGranted && !videoPermissionGranted) ||
    (!micPermissionGranted && videoPermissionGranted)) {
    permissions = 'single';
    if (!micPermissionGranted) {
      permissionString = 'Please share audio';
    }
    if (!videoPermissionGranted) {
      permissionString = 'Please share video';
    }
  }

  useEffect(() => {
    if (scene !== currentScene.current || scene === 'entry') {
      setDisplayScene(false);
      currentScene.current = (scene === 'entry') ? 'limbo' : scene;
      currentIndex.current = index.toString().padStart(2, '0');
      setDisplayScene(true);
    }
  }, [currentScene, index, scene]);

  return (
    <div
      className={`topContainer${(displayScene) ? ' displayScene' : ''}${(initiated) ? '' : ' delayed'}`}
      onAnimationEnd={() => {
        setInitiated(true);
        setDisplayScene(false);
      }}
    >
      <div
        className={`permissionIndicator ${permissions}Permission`}
        onAnimationEnd={(event) => event.stopPropagation()}
      >
        <div className="svgContainer">
          {(micPermission === 'granted') ? (
            <Microphone fill="#000" fillOpacity="0.65" />
          ) : (
            <MicrophoneSlash
              fill={(permissions === 'single') ? '#000' : '#fff'}
              fillOpacity={(permissions === 'single') ? '0.65' : '1'}
            />
          )}
        </div>
        <span>{permissionString}</span>
        <div className="svgContainer">
          {(videoPermission === 'granted') ? (
            <Video fill="#000" fillOpacity="0.65" />
          ) : (
            <VideoSlash
              fill={(permissions === 'single') ? '#000' : '#fff'}
              fillOpacity={(permissions === 'single') ? '0.65' : '1'}
            />
          )}
        </div>
      </div>
      <div
        className="scenebar"
      >
        <div className="scenebarContainer">
          <div className="scenebarLeftGroup">
            <div className="svgContainer"><Location /></div>
            <span className="sceneTitle textSmall textMedium">{currentScene.current}</span>
          </div>
          <span className="sceneNumber textSmall">{currentIndex.current}</span>
        </div>
      </div>
    </div>
  );
}

export default Top;
