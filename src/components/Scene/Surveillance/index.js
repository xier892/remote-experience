import React, { useContext, useState, useEffect } from 'react';
import SceneVisible from 'context/SceneVisible';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import VideoFrame from 'components/VideoFrame';
import music from 'media/audio/surveillance-ambient';
import './surveillance.css';

function VideoGrid() {
  const sceneVisible = useContext(SceneVisible);
  const items = [];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sceneVisible) {
      setVisible(true);
    }
  }, [sceneVisible]);


  for (let i = 0; i < 9; i++) {
    items.push(<VideoFrame key={i} animationDelay={(i + 0.15) * 0.1} />);
  }

  return (visible) ? (
    <div className="videogrid">
      {items}
    </div>
  ) : '';
}

function Surveillance() {
  return (
    <Scene name="surveillance">
      <VolumeController audio={music}>
        <VideoGrid />
      </VolumeController>
    </Scene>
  );
}

export default React.memo(Surveillance);
