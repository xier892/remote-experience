import Pizzicato from 'pizzicato';
import surveillanceMp3 from './surveillance-ambient.mp3';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: surveillanceMp3,
    volume: 0.3,
    attack: 6,
    release: 5,
    loop: true
  }
}, () => {
  audio.stop();
});

export default audio;
