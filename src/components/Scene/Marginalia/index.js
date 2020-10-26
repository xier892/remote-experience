import React, { useState, useRef, useEffect, useContext } from 'react';
import SceneVisible from 'context/SceneVisible';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import { error1, error2, error3, error4, error5 } from 'media/audio/error';
import { beep3, beep4 } from 'media/audio/beep';
import { click2 } from 'media/audio/click';
import music from 'media/audio/ufo-ambient';
import playAudioInstance from 'api/playAudioInstance';
import './marginalia.css';

function Message({ children, parent }) {
  useEffect(() => {
    parent.current.scrollTop = parent.current.scrollHeight;
  }, [parent]);

  return (
    <p className="textScrambled message">{children}</p>
  );
}

function MessageHeader() {
  return (
    <h3 className="textSmall messageHeader">
      From Me to <span className="recipientLabel">Nobody</span>
    </h3>
  )
}

const Chatbox = React.forwardRef((props, ref) => {
  const [initiated, setInitiated] = useState(false);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const body = useRef(null);
  const input = useRef(null);
  const sceneVisible = useContext(SceneVisible);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    let audio;
    const i = Math.random();

    if (i < 0.5) {
      audio = beep3;
    } else {
      audio = beep4;
    }

    playAudioInstance(audio);
  };

  const handleSubmit = (event) => {
    const i = Math.random();
    let audio;

    if (i < 0.2) {
      audio = error1;
    } else if (i >= 0.2 && i < 0.4) {
      audio = error2;
    } else if (i >= 0.4 && i < 0.6) {
      audio = error3;
    } else if (i >= 0.6 && i < 0.8) {
      audio = error4;
    } else if (i >= 0.8 && i < 1) {
      audio = error5;
    }

    playAudioInstance(audio);
    event.preventDefault();
    setInitiated(true);
    setMessages((prevMessages) => [...prevMessages, value]);
    setValue('');
  };

  useEffect(() => {
    if (!sceneVisible) {
      input.current.blur();
    }
  }, [sceneVisible, input]);

  return (
    <VolumeController className="chatbox" audio={music} ref={ref}>
      <header className="chatHeader">
        <h2 className="textSemibold">Group Chat</h2>
      </header>
      <div
        className="chatBody"
        ref={body}
        // onWheel={(event) => {
        //   if (body.current.scrollHeight > body.current.clientHeight) {
        //     event.stopPropagation();
        //   }
        // }}
      >
        {initiated && <MessageHeader />}
        {messages.map((message, i) => (<Message parent={body} key={i}>{message}</Message>))}
      </div>
      <footer className="chatInputContainer">
        <label htmlFor="chat" className="chatLabel">
          <span className="textMedium textSmall">To:</span> <span className="recipientLabel textSmall">Nobody</span>
        </label>
        <form className="chatForm" onSubmit={handleSubmit}>
          <input
            className="chatInput"
            type="text"
            name="chat"
            placeholder="Type message here…"
            value={value}
            onChange={handleInputChange}
            ref={input}
            disabled={(!sceneVisible)}
            tabIndex={(sceneVisible) ? undefined : '-1'}
          />
          <input
            className="chatSend"
            type="submit"
            value="Send"
            disabled={(value.length <= 0 || !sceneVisible)}
            onMouseDown={() => playAudioInstance(click2)}
            onTouchStart={() => playAudioInstance(click2)}
            tabIndex={(sceneVisible) ? undefined : '-1'}
          />
        </form>
      </footer>
    </VolumeController>
  );
});

function Marginalia() {
  return (
    <Scene name="marginalia">
      <Chatbox />
    </Scene>
  );
}

export default React.memo(Marginalia);
