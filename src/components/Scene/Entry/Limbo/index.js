import React, { useState, useContext } from 'react';
import { useLocalStorage, usePermission, useEffectOnce } from 'react-use';
import OverlayContext from 'context/OverlayContext';
import SceneVisible from 'context/SceneVisible';
import VolumeController from 'components/VolumeController';
import Audio from 'media/image/waiting-audio.svg';
import Video from 'media/image/waiting-video.svg';
import Location from 'media/image/waiting-location.svg';
import music from 'media/audio/jazz-ambient';
import zoombell from 'media/audio/zoombell';
import { click2 } from 'media/audio/click';
import { success1, success2 } from 'media/audio/success';
import error from 'media/audio/error';
import playAudioInstance from 'api/playAudioInstance';
import generateRandomNumber from 'api/generateRandomNumber';

// const password = generateRandomNumber(6);
const participantID = generateRandomNumber(6);

function TableColumn({ title, children }) {
  return (
    <div className="tableColumn">
      <span className="textSemibold title">{title}:</span>
      <span className="children">{children}</span>
    </div>
  );
}

function WaitingTable() {
  const [id] = useLocalStorage('participantID', participantID);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <div className="table">
      <TableColumn title="Meeting Topic">
        <span>The Remote Experience</span>
      </TableColumn>
      <TableColumn title="Host">
        <span className="textScrambled">Ricky Xie</span>
      </TableColumn>
      {/* <TableColumn title="Password">
        <span>{password}</span>
      </TableColumn> */}
      <TableColumn title="Invitation URL">
        <span
          className={(linkCopied) ? 'copied' : ''}
          onAnimationEnd={() => {
            setLinkCopied(false);
          }}
        >
          {window.location.href}
        </span>
        <button
          className="copyUrl"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              playAudioInstance(success1);
              setLinkCopied(true);
            });
          }}
        >
          <span className="textSmall">Copy URL</span>
        </button>
      </TableColumn>
      <TableColumn title="Participant ID">
        <span>{id}</span>
      </TableColumn>
    </div>
  );
}

function StatusItem({ permission, label, callback }) {
  const { cameraStream, setCameraStream } = useContext(OverlayContext);
  const sceneVisible = useContext(SceneVisible);

  const mic = usePermission({ name: 'microphone' });
  const cam = usePermission({ name: 'camera' });

  let p;
  let userMedia;
  let image;
  let labelText = label;
  let successLabel;
  let successString;
  let caption;

  switch (permission) {
    case 'microphone':
      p = mic;
      userMedia = { audio: true };
      successLabel = 'Audio';
      successString = 'Audio Connected';
      image = (<img src={Audio} alt="" />);
      break;
    case 'camera':
      p = cam;
      userMedia = { video: true };
      successLabel = 'Video';
      successString = 'Video Connected';
      image = (<img src={Video} alt="" />);
      break;
    default:
      image = (<img src={Location} alt="" />);
  }

  if (permission) {
    let successCondition = (p === 'granted');
    let promptCondition = (p === 'prompt');
    let deniedCondition = (p === 'denied');

    if (permission === 'camera') {
      successCondition = (p === 'granted' && cameraStream);
      promptCondition = ((p === 'granted' && !cameraStream) && (p === 'prompt'));
    }

    if (successCondition) {
      labelText = successLabel;
      caption = (<p className="textSmall textMedium caption success">{successString}</p>);
    } else if (promptCondition) {
      caption = (<></>);
    } else if (deniedCondition) {
      labelText = successLabel;
      caption = (<p className="textSmall textMedium caption error">Access Denied</p>);
    } else {
      caption = (<></>);
    }
  } else {
    caption = (<p className="textSmall textMedium caption">Click to find out</p>)
  }

  const handleClick = () => {
    const errString = (type = 'microphone and camera') => `Permission denied!\nPlease enable ${type} access via your browser’s settings.`;

    if (permission) {
      if (permission === 'camera') {
        navigator.mediaDevices.getUserMedia(userMedia)
        .then((stream) => {
          playAudioInstance(success2);
          setCameraStream(stream);
        })
        .catch((err) => {
          playAudioInstance(error);
          setCameraStream(null);
          alert(errString('camera'));
        });
      } else {
        navigator.mediaDevices.getUserMedia(userMedia)
        .then((stream) => {
          playAudioInstance(success2);
        })
        .catch((err) => {
          playAudioInstance(error);
          alert(errString('microphone'));
        });
      }
    }

    if (callback) {
      callback();
    }
  };

  const childElements = (
    <>
      <div className="svgContainer">{image}</div>
      <p className="textSmall textSemibold">
        {labelText}
      </p>
      {caption}
    </>
  );

  if (p === 'granted' && ((permission === 'camera' && cameraStream) || permission === 'microphone')) {
    return <div className="statusItem">{childElements}</div>
  }

  return (
    <button
      className="statusItem"
      onMouseDown={() => playAudioInstance(click2)}
      onClick={handleClick}
      disabled={(!sceneVisible)}
    >
      {childElements}
    </button>
  );
}

function Limbo() {
  useEffectOnce(() => {
    playAudioInstance(zoombell);
  });

  return (
    <VolumeController audio={music}>
      <div className="waitingRoom">
        <WaitingTable />
        <div className="statusContainer">
          <StatusItem permission="microphone" label="Join Audio" />
          <StatusItem permission="camera" label="Start Video" />
          <OverlayContext.Consumer>
            {({ setUniqueState }) => (
              <StatusItem label="Where am I?" callback={() => setUniqueState('onboard')} />
            )}
          </OverlayContext.Consumer>
        </div>
      </div>
    </VolumeController>
  );
}

export default Limbo;
