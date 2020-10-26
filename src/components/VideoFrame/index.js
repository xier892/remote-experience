import React, { useState } from 'react';
import Eyeball from 'components/Eyeball';
import playAudioInstance from 'api/playAudioInstance';
import audio from 'media/audio/zoombell';
import './videoframe.css';

function VideoFrame({ animationDelay = 0, theme }) {
  const [initiated, setInitiated] = useState(false);

  const playAudio = () => {
    if (!initiated) playAudioInstance(audio);
  };

  const eyeballColors = {};
  let { sclera, eyelid, iris } = eyeballColors;

  switch (theme) {
    case 'antarctica':
      sclera = '#fff';
      eyelid = '#0E1824';
      iris = ['#94AFDF', '#1C253D'];
      break;
    case 'mars':
      sclera = '#fffad6';
      eyelid = '#1E1615';
      iris = ['#F8956A', '#3D1C1C'];
      break;
    case 'closet':
      sclera = '#393939';
      eyelid = '#000';
      iris = ['#ABABAB', '#505050'];
      break;
    case 'shadow':
      sclera = '#FF00B2';
      eyelid = '#011004';
      iris = ['#EEFF00', '#000'];
      break;
    default:
      sclera = '#fffad6';
      eyelid = '#10493a';
      iris = ['#c17ace', '#391c3d'];
  }

  return (
    <div
      className={`videoframe${` ${theme}`}`}
      style={{ animationDelay: `${animationDelay}s` }}
      onAnimationStart={() => {
        setInitiated(true);
        playAudio();
      }}
    >
      <div className="videoframeContainer">
        <Eyeball
          openDelay={animationDelay / 5 + Math.random() + 0.6}
          twitchDelay={Math.random() * 3}
          sclera={sclera}
          eyelid={eyelid}
          iris={iris}
        />
      </div>
    </div>
  );
}

export default React.memo(VideoFrame);
