import Pizzicato from 'pizzicato';
import collapse from './Collapse.m4a';

const audio = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: collapse,
    attack: 0.5,
    release: 0.5,
    detached: true
  }
});

export default audio;
