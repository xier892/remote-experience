import Pizzicato from 'pizzicato';
import ufoMp3 from './ufo-ambient.mp3';
import ufoWav from './ufo-ambient.wav';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [ufoMp3, ufoWav],
    volume: 0.1,
    attack: 5,
    release: 5,
    loop: true
  }
}, () => {
  audio.stop();
});

export default audio;
