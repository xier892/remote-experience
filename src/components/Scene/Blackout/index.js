import React from 'react';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import music from 'media/audio/static';
import './blackout.css';

function Blackout() {
  const string = 'Your internet connection is unstable';

  return (
    <Scene name="blackout">
      <VolumeController audio={music}>
        {[...string].map((i, index) => {
          const random = Math.random();
          const className = (random > 0.78) ? 'textScrambled unjumble' : 'textSemibold jumble';

          return (
            <span
              className={className}
              key={index}
              style={{ animationDelay: `${random * 10}s` }}
              >
                {i}
              </span>
            );
          })}
      </VolumeController>
    </Scene>
  );
}

export default Blackout;
