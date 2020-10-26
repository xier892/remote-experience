import React, { useEffect } from 'react';
import Button from 'components/Button';
import { notification2 } from 'media/audio/notification';
import playAudioInstance from 'api/playAudioInstance';
import './leaveModal.css';

function LeaveModal({ onLeave = () => {}, onCancel = () => {} }) {
  useEffect(() => {
    playAudioInstance(notification2);
  });

  return (
    <div className="leaveModal">
      <Button className="leaveButton" callback={onLeave}>Leave Meeting</Button>
      {/* <button className="cancelButton" onClick={onCancel}>Cancel</button> */}
    </div>
  );
}

export default LeaveModal;
