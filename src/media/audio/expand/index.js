import Pizzicato from 'pizzicato';
import expand from './Expand.m4a';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: expand,
    attack: 0.4,
    detached: true
  }
});

export default audio;
