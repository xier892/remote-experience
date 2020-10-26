import Pizzicato from 'pizzicato';
import success1f from './Success 1.m4a';
import success2f from './Success 2.m4a';
import success3f from './Success 3.m4a';

const success1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: success1f,
    volume: 0.7,
    detached: true
  }
});

const success2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: success2f,
    volume: 0.7,
    detached: true
  }
});

const success3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: success3f,
    volume: 0.7,
    detached: true
  }
});

export default success1;
export { success1, success2, success3 };
