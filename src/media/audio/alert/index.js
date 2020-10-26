import Pizzicato from 'pizzicato';
import audio1 from './Alert 1.m4a';
import audio2 from './Alert 2.m4a';
import audio3 from './Alert 3.m4a';
import audio4 from './Alert 4.m4a';
import audio5 from './Alert 5.m4a';

const alert1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio1,
    detached: true
  }
});

const alert2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio2,
    detached: true
  }
});

const alert3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio3,
    detached: true
  }
});

const alert4 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio4,
    detached: true
  }
});

const alert5 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio5,
    detached: true
  }
});

export default alert1;
export { alert1, alert2, alert3, alert4, alert5 };
