import Pizzicato from 'pizzicato';
import cryingMp3 from './crying.mp3';
import cryingWav from './crying.wav';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [cryingMp3, cryingWav],
    loop: true,
    attack: 0.5,
    release: 0.9,
    volume: 0.3
  }
}, () => {
  audio.stop();
});

export default audio;
