import { createContext } from 'react';

const OverlayContext = createContext({
  initiated: false,
  index: 0,
  scene: '',
  lastIndex: 0,
  cameraStream: null,
  setCameraStream: () => {},
  uniqueState: null,
  setUniqueState: () => {}
});

export default OverlayContext;
