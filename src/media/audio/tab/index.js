import Pizzicato from 'pizzicato';
import tab1f from './Tab 1.m4a';
import tab2f from './Tab 2.m4a';
import tab3f from './Tab 3.m4a';

const tab1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: tab1f,
    volume: 0.7,
    detached: true
  }
});

const tab2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: tab2f,
    detached: true
  }
});

const tab3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: tab3f,
    detached: true
  }
});

export default tab1;
export { tab1, tab2, tab3 };
