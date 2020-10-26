import React, { useState } from 'react';
import { usePermission } from 'react-use';
import Limbo from './Limbo';
import OverlayContext from 'context/OverlayContext';
import Scene from 'components/Scene';
import Button from 'components/Button';
import Loader from 'react-loader-spinner';
import SharingDemo from 'media/image/enableSharing.png';
import './entry.css';

function EntryButton({ callback = () => {} }) {
  const [triggered, setTriggered] = useState(false);
  const pCheck1 = usePermission({ name: 'microphone' });
  const pCheck2 = usePermission({ name: 'camera' });

  const pCheck = (pCheck1 === 'granted' || pCheck1 === 'denied' || pCheck2 === 'granted' || pCheck2 === 'denied')

  return (triggered) ? (
    <div className="waitingForPrompt">
      <div className="waitingMessage">
        <Loader type="Oval" width="1.4em" height="1.4em" color="#3582E8" />
        <p className="textSemibold">
          Please wait, the meeting host will let you in soon.
        </p>
      </div>
      <img src={SharingDemo} width="350" height="220" alt="Screenshot of a browser prompt to enable access to the microphone and camera" />
      <p className="textSmall">This site uses your microphone and camera for a more immersive experience. When the browser prompts, click on <span className="textSemibold">Allow</span> to enable access.</p>
    </div>
  ) : (
    <>
      <Button
        blurOnInteract
        callback={() => {
          setTriggered(true);
          setTimeout(callback, (pCheck) ? 1750 : 0);
        }}
      >
        Join with Computer Audio
      </Button>
      <h1 className="entryText">Welcome to the Remote Experience</h1>
    </>
  );
}

function Entry({ callback = () => {} }) {
  return (
    <Scene name="entry">
      <OverlayContext.Consumer>
        {({ initiated }) =>
          (initiated) ? (
            <Limbo />
          ) : (
            <EntryButton callback={callback}  />
          )
        }
      </OverlayContext.Consumer>
    </Scene>
  );
}

export default Entry;
