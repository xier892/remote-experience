import React, { useRef } from 'react';
import playAudioInstance from 'api/playAudioInstance';
import audio from 'media/audio/click';
import './button.css';

function Button({
  children,
  blurOnInteract = false,
  className,
  type = 'button',
  tabIndex,
  disabled = false,
  callback = () => {}
}) {
  const el = useRef(null);

  const blur = () => {
    el.current.blur();
  };

  return (
    <button
      ref={el}
      className={`button${(className) ? ` ${className}` : ''}`}
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
      onMouseDown={() => playAudioInstance(audio)}
      onClick={(event) => {
        if (blurOnInteract) blur();
        callback();
      }}>
      <span className="textMedium">
        {children}
      </span>
    </button>
  );
}

export default Button;
