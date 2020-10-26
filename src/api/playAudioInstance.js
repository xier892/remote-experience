function playAudioInstance(audio) {
  const instance = audio.clone();
  instance.play();
  instance.on('end', () => {
    instance.disconnect();
  });
}

export default playAudioInstance;
