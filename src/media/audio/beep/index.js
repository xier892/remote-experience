import Pizzicato from 'pizzicato';
import button1 from './Button 1.m4a';
import button2 from './Button 2.m4a';
import button6 from './Button 6.m4a';
import button7 from './Button 7.m4a';

const beep1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button1,
    detached: true
  }
});

const beep2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button2,
    detached: true
  }
});

const beep3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button6,
    detached: true
  }
});

const beep4 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: button7,
    detached: true
  }
});

export default beep1;
export { beep1, beep2, beep3, beep4 };
