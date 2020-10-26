import React, { useRef } from 'react';
import { useEffectOnce } from 'react-use';

const VolumeController = React.forwardRef(({ children, className, audio, onIntersect = () => {}, onLeave = () => {} }, ref) => {
  const volumeController = ref || useRef(null);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (audio) audio.play();
        onIntersect();
      } else {
        if (audio) audio.pause();
        onLeave();
      }
    });
  }, { threshold: 0.25, rootMargin: '0px -50% 0px 0px' });

  useEffectOnce(() => {
    observer.observe(volumeController.current);
  }, [observer]);

  return (
    <div className={`volumeController${` ${className || ''}`}`} ref={volumeController}>
      {children}
    </div>
  );
});

export default VolumeController;
