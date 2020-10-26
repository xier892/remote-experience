import Pizzicato from 'pizzicato';
import complete1f from './Complete 1.m4a';
import complete2f from './Complete 2.m4a';
import complete3f from './Complete 3.m4a';

const complete1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: complete1f,
    volume: 0.7,
    detached: true
  }
});

const complete2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: complete2f,
    detached: true
  }
});

const complete3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: complete3f,
    detached: true
  }
});

export default complete1;
export { complete1, complete2, complete3 };
