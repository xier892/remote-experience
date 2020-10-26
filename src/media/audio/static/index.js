import Pizzicato from 'pizzicato';
import staticMp3 from './static.mp3';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: staticMp3,
    volume: 0.05,
    attack: 1,
    release: 9,
    loop: true
  }
}, () => {
  audio.stop();
});

export default audio;
