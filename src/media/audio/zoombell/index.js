import Pizzicato from 'pizzicato';
import zoombellMp3 from './zoombell.mp3';
import zoombellWav from './zoombell.wav';
import zoombellOgg from './zoombell.ogg';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: [zoombellMp3, zoombellWav, zoombellOgg],
    detached: true
  }
});

export default audio;
