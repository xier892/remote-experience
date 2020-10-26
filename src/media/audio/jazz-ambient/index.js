import Pizzicato from 'pizzicato';
import jazzMp3 from './jazz-ambient.mp3';

const lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 400,
    peak: 10
});

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: jazzMp3,
    volume: 0.2,
    attack: 5,
    release: 10,
    loop: true
  }
});

audio.addEffect(lowPassFilter);
audio.stop();

export default audio;
