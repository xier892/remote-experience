import Pizzicato from 'pizzicato';
import tvMp3 from './tv-ambient.mp3';
import tvWav from './tv-ambient.wav';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [tvMp3, tvWav],
    volume: 0.6,
    attack: 0.5,
    release: 7,
    loop: true
  }
}, () => {
  audio.stop();
});

export default audio;
