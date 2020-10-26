import Pizzicato from 'pizzicato';
import button3 from './Button 3.m4a';
import button4 from './Button 4.m4a';
import button5 from './Button 5.m4a';

const click1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button3,
    volume: 0.7,
    detached: true
  }
});

const click2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button4,
    detached: true
  }
});

const click3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button5,
    detached: true
  }
});

export default click1;
export { click1, click2, click3 };
