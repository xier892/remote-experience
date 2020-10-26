import Pizzicato from 'pizzicato';
import openMp3 from './open.mp3';
import openWav from './open.wav';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [openMp3, openWav],
    volume: 0.35,
    detached: true
  }
});

export default audio;
