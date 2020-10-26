import Pizzicato from 'pizzicato';

const audio = new Pizzicato.Sound({
  source: 'wave',
  options: {
    frequency: 1500,
    type: 'sawtooth',
    attack: 0.5,
    release: 0.9,
    volume: 0.02
  }
});

const delay = new Pizzicato.Effects.PingPongDelay({
  feedback: 0.6,
  time: 0.4,
  mix: 0.5
});

audio.addEffect(delay);
audio.stop();

export default audio;
