import Pizzicato from 'pizzicato';
import audio1 from './Error 1.m4a';
import audio2 from './Error 2.m4a';
import audio3 from './Error 3.m4a';
import audio4 from './Error 4.m4a';
import audio5 from './Error 5.m4a';

const error1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio1,
    detached: true
  }
});

const error2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio2,
    detached: true
  }
});

const error3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio3,
    detached: true
  }
});

const error4 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio4,
    detached: true
  }
});

const error5 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: audio5,
    detached: true
  }
});

export default error1;
export { error1, error2, error3, error4, error5 };
