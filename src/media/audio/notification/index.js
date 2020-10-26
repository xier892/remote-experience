import Pizzicato from 'pizzicato';
import notification1f from './Notification 1.m4a';
import notification2f from './Notification 2.m4a';
import notification3f from './Notification 3.m4a';
import notification4f from './Notification 4.m4a';
import notification5f from './Notification 5.m4a';
import notification6f from './Notification 6.m4a';
import notification7f from './Notification 7.m4a';
import notification8f from './Notification 8.m4a';
import notification9f from './Notification 9.m4a';

const notification1 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification1f,
    detached: true
  }
});

const notification2 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification2f,
    volume: 0.5,
    detached: true
  }
});

const notification3 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification3f,
    detached: true
  }
});

const notification4 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification4f,
    detached: true
  }
});

const notification5 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification5f,
    detached: true
  }
});

const notification6 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification6f,
    detached: true
  }
});

const notification7 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification7f,
    detached: true
  }
});

const notification8 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification8f,
    detached: true
  }
});

const notification9 = new Pizzicato.Sound({
  source: 'file',
  options: {
    path: notification9f,
    detached: true
  }
});

export default notification1;
export { notification1, notification2, notification3, notification4, notification5, notification6, notification7, notification8, notification9 };
