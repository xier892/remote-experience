import Pizzicato from 'pizzicato';
import prisonMp3 from './prison.mp3';
import prisonWav from './prison.wav';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [prisonMp3, prisonWav],
    volume: 0.45,
    offset: 0.5,
    release: 0.9,
    detached: true
  }
});

export default audio;
