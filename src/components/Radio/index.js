import React from 'react';
import { tab2 } from 'media/audio/tab';
import playAudioInstance from 'api/playAudioInstance';
import './radio.css';

const Radio = React.forwardRef(({ name = 'radio', value, checked, disabled, tabIndex, onChange = () => {}, label }, ref) => {
  const cancelBubble = (event) => {
    event.stopPropagation();
  };

  return (
    <label className={`radio${(disabled) ? ' disabled' : ''}`}>
      <input
        type="radio"
        name={name}
        value={value}
        ref={ref}
        disabled={disabled}
        tabIndex={tabIndex}
        checked={checked}
        onKeyUp={cancelBubble}
        onKeyDown={cancelBubble}
        onKeyPress={cancelBubble}
        onChange={(event) => {
          if (event.target.checked) {
            playAudioInstance(tab2);
            onChange();
          }
        }}
      />
      <span className="radioControl" />
      <span className="radioLabel">{label}</span>
    </label>
  );
});

export default Radio;
