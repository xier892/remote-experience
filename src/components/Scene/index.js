import React, { useRef, useState, useEffect } from 'react';
import SceneVisible from 'context/SceneVisible';
import './scene.css';

const Scene = React.forwardRef(({ name, border, background, children }, ref) => {
  let className = 'scene';
  const el = ref || useRef(null);

  if (name) className += ` ${name}`;
  if (border) className += ' border';

  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setOpacity(entry.intersectionRatio);
    });
  }, { threshold: 0.75 });

  useEffect(() => {
    observer.observe(el.current);
  }, [el, observer]);

  return (
    <SceneVisible.Provider value={visible}>
      <section
        className={(visible) ? `${className} visible` : className} ref={el}
        id={name}
        style={{ background }}
      >
        <div className="inner" style={{ opacity: opacity }}>
          {children}
        </div>
      </section>
    </SceneVisible.Provider>
  )
});

export default Scene;
