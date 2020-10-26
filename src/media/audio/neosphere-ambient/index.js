import Pizzicato from 'pizzicato';
import neosphereMp3 from './neosphere-ambient.mp3';
import neosphereWav from './neosphere-ambient.wav';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [neosphereMp3, neosphereWav],
    volume: 0.2,
    attack: 5,
    release: 5,
    loop: true
  }
}, () => {
  audio.stop();
});

export default audio;
