import React, { useState } from 'react';
import Pizzicato from 'pizzicato';
import { usePermission } from 'react-use';
import { Sound } from 'pts';
import { QuickStartCanvas } from 'react-pts-canvas';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import audio from 'media/audio/feedback';
import './grima.css';

function Waveform() {
  const [sound, setSound] = useState();

  const distortion = new Pizzicato.Effects.Distortion({
    gain: 1
  });

  const delay = new Pizzicato.Effects.Delay({
    feedback: 0,
    time: 0.5,
    mix: 0.5
  });

  const mic = new Pizzicato.Sound({
    source: 'input',
    options: {
      attack: 0.5,
      release: 0.9
    }
  }, () => {
    mic.addEffect(delay);
    mic.addEffect(distortion);
    mic.stop();
  });

  return (
    <VolumeController
      audio={audio}
      onIntersect={() => {
        mic.play();
        if (!sound) {
          Sound.input().then((s) => {
            setSound(s.analyze(128, -100, -30, 0.5));
          });
        } else {
          sound.start();
        }
      }}
      onLeave={() => {
        mic.pause();
        if (sound && sound.playable) sound.stop();
      }}
    >
      <QuickStartCanvas
        background="#f5ef4f"
        onAnimate={(space, form, time, ftime) => {
          if (sound && sound.playable) {
            const td = sound.timeDomainTo(space.size);
            form.strokeOnly('#111', 8).line(td);
          }
        }}
      />
    </VolumeController>
  );
}

function Grima() {
  const micPermission = usePermission({ name: 'microphone' });

  return (
    <Scene border name="grima">
      {(micPermission === 'granted') ? (
        <Waveform />
      ) : (
        <VolumeController audio={audio} />
      )}
    </Scene>
  );
}

export default Grima;
