import Pizzicato from 'pizzicato';
import cancel1f from './Cancel 1.m4a';
import cancel2f from './Cancel 2.m4a';

const cancel1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: cancel1f,
    detached: true
  }
});

const cancel2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: cancel2f,
    detached: true
  }
});

export default cancel1;
export { cancel1, cancel2 };
