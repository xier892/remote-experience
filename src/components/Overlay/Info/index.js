import React, { useEffect, useState, useContext, useRef } from 'react';
import { useTitle } from 'react-use';
import OverlayContext from 'context/OverlayContext';
import Button from 'components/Button';
import { TextBlock } from 'react-placeholder/lib/placeholders';
import './info.css';

const string = require('data/string.json');

function BlackoutPlaceholder() {
  return (
    <>
      <TextBlock
        color="rgba(69, 81, 97, 0.25)"
        rows={3}
        showLoadingAnimation={true}
      />
      <TextBlock
        color="rgba(69, 81, 97, 0.25)"
        rows={4}
        showLoadingAnimation
      />
      <TextBlock
        color="rgba(69, 81, 97, 0.25)"
        rows={2}
        showLoadingAnimation={true}
      />
      <TextBlock
        color="rgba(69, 81, 97, 0.25)"
        rows={3}
        showLoadingAnimation={true}
      />
    </>
  );
}

function Info({ visible, onDismiss = () => {} }) {
  const infoContainer = useRef(null);
  const { scene } = useContext(OverlayContext);
  const [onboarded, setOnboarded] = useState(false);

  useTitle(`${string[scene].title} | The Remote Experience`);

  useEffect(() => {
    if (visible) {
      if (scene === 'index') {
        setOnboarded(true);
      }
      infoContainer.current.scrollTop = 0;
    }
  }, [visible, scene]);

  return (
    <aside className={`info groovepaper${(visible) ? ' visible' : ''}${(scene === 'blackout') ? ' blackoutInfo' : ''}`}>
      {/* dismiss info */}
      <Button
        className="dismissButton"
        callback={onDismiss}
        blurOnInteract
        disabled={(!visible)}
      >
        Dismiss
      </Button>
      <div className="infoContainer" ref={infoContainer}>
        <h1 className="textSemibold textHeading">
          {string[scene].title}
        </h1>
        {(scene === 'blackout') ? (
          <BlackoutPlaceholder />
        ) : string[scene].body.filter((paragraph) => {
          if (onboarded && scene === 'entry' && (paragraph.includes('Welcome to the Remote Experience') || paragraph.includes('This panel, where you may find scantly useful context'))) {
            return false;
          }
          return true;
        }).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </aside>
  );
}

export default Info;
