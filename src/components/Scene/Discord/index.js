import React, { useRef, useState, useContext } from 'react';
import { useEffectOnce, useMouse } from 'react-use';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import Button from 'components/Button';
import { ReactComponent as Duck } from 'media/image/duck.svg';
import SceneVisible from 'context/SceneVisible';
import audio from 'media/audio/crying';
import { alert2 } from 'media/audio/alert';
import playAudioInstance from 'api/playAudioInstance';
import './discord.css';

function DuckPlayground() {
  const sceneVisible = useContext(SceneVisible);

  const volumeController = useRef(null);
  const duck = useRef(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const { posX, elX } = useMouse(volumeController);
  const { elW, elH } = useMouse(duck);

  const moveDuck = () => {
    if (sceneVisible) {
      setButtonDisabled(true);
      setTranslate({
        x: elX - posX * 2 - elW / 2,
        y: elH / 2
      });
      setScale(1.2);
      playAudioInstance(alert2);
    }
  };

  const resetDuck = () => {
    setTranslate({ x: 0, y: 0 });
    setScale(1);
    setButtonDisabled(false);
  };

  useEffectOnce(() => {
    alert2.volume = 0.3;
  });

  return (
    <VolumeController audio={audio} ref={volumeController}>
      <div
        className="handButtonContainer"
        onMouseMove={moveDuck}
        onMouseEnter={moveDuck}
      >
        <Button
          className="handButton"
          tabIndex="-1"
          disabled={(buttonDisabled)}
          callback={moveDuck}
        >
          <span role="img" aria-label="hand">✋</span> Raise Hand
        </Button>
      </div>
      <div
        className="duck"
        style={{ transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})` }}
        onMouseLeave={resetDuck}
        ref={duck}
      >
        <div className="svgContainer duckContainer">
          <Duck />
        </div>
      </div>
    </VolumeController>
  );
}

function Discord() {
  return (
    <Scene border name="discord">
      <DuckPlayground />
    </Scene>
  )
}

export default React.memo(Discord);
