import React, { useRef, useState, useContext } from 'react';
import Scene from 'components/Scene';
import VolumeController from 'components/VolumeController';
import Button from 'components/Button';
import Radio from 'components/Radio';
import VideoFrame from 'components/VideoFrame';
import OverlayContext from 'context/OverlayContext';
import SceneVisible from 'context/SceneVisible';
import music from 'media/audio/neosphere-ambient';
import audio from 'media/audio/prison';
import playAudioInstance from 'api/playAudioInstance';
import './confinement.css';

function BreakoutDialog({ theme, visible = true, onChange = () => {}, onSubmit = () => {} }) {
  const sceneVisible = useContext(SceneVisible);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
    playAudioInstance(audio);
  };

  return (
    <div className={`breakoutDialog ${theme}${(visible) ? ' visible' : ''}`}>
      <header className="breakoutDialogHeader">
        <div className="breakoutDialogHeaderDecorContainer">
          <div className="breakoutDialogHeaderDecor" />
          <div className="breakoutDialogHeaderDecor" />
          <div className="breakoutDialogHeaderDecor" />
        </div>
        <h2 className="textSmall">Breakout Rooms</h2>
      </header>
      <form onSubmit={handleSubmit} readOnly={(!sceneVisible)}>
        <div className="breakoutDialogBody">
          <p className="textMedium">Banish all participants to:</p>
          <div className="breakoutInputGroup">
            <Radio
              name="breakout"
              value="antarctica"
              onChange={() => onChange('antarctica')}
              checked={(theme === 'antarctica')}
              disabled={(!sceneVisible)}
              tabIndex={(sceneVisible) ? undefined : '-1'}
              label="Antarctica"
            />
            <Radio
              name="breakout"
              value="mars"
              onChange={() => onChange('mars')}
              checked={(theme === 'mars')}
              disabled={(!sceneVisible)}
              tabIndex={(sceneVisible) ? undefined : '-1'}
              label="Mars"
            />
            <Radio
              name="breakout"
              value="closet"
              onChange={() => onChange('closet')}
              checked={(theme === 'closet')}
              disabled={(!sceneVisible)}
              tabIndex={(sceneVisible) ? undefined : '-1'}
              label="Your closet"
            />
            <Radio
              name="breakout"
              value="shadow"
              onChange={() => onChange('shadow')}
              checked={(theme === 'shadow')}
              disabled={(!sceneVisible)}
              tabIndex={(sceneVisible) ? undefined : '-1'}
              label="The Shadow Realm"
            />
          </div>
        </div>
        <Button
          className="breakoutButton"
          blurOnInteract
          type="submit"
          disabled={(!sceneVisible)}
        >
          {(theme === 'shadow') ? 'Ç̴̫̣̥̥̯̳̲͉̜̤̲̤͗̒ͅr̵̢̡̻̺̠͕̹͙̭͕̤̜̊̈͑̆̂̑̇̈́̚̕̕̕ͅê̷̡͎̖ą̷̛͙̲̫̙̗͍̣̬͕̠̫̱̝̣̐͋̅̀̌͐̃̚͝t̸̡̧̛̲̠͖̬̯̬̘͉̠̺̦̤͑̉̎̀̊̓͊̄̆͌̌͘͘ẽ̷̯͇̇͘͝ ̸̛͈͕͈̯̘͔̏͆̏̄̑͗͝ͅͅB̶̛͉͈̞̫̰̑̓̋̀͒̃̓̈́̕ͅr̶̛̜͉͙̱͚̩̱̖̜̳̠͍̼̘̈̔͗̓͐̐̊̽͑ë̶̡͉̲́̊̀͊͋̐̈͆̑͝͠a̷̧̧̱̣̰̝̘̯͉̳͖̝̹͔̅̏k̷̛͚͐͂͆̂͆̋͋̍̾̀̊͠ǫ̷̢̢͉̙̤͎̥̮̖̮̫͆̓̑́̍̚̚͝ǔ̸̡̨̧͕͚͓͓͂͜͜͠ţ̶͉͈̮̭͎͙̈́̒̂͊̔̈́ ̸̨̼̌͌̆͂̐R̸͓̈́͒ͅṑ̴̠̠̯̬͚̜̻̼̩͔̖̭̝̇̇̆̈̅̇͝͠ö̵͈̦̪̹̞́̋̑m̸̨̨͚̮̞̯̳͇̩̙̿͛̍͒̊͗̾̀̍́̎̓͝s̴̨̞̭̻̘͙̤̤͛̔̍̂̓̐̈́' : 'Create Breakout Rooms'}
        </Button>
      </form>
    </div>
  );
}

function Confinement() {
  const sceneEl = useRef(null);

  const [theme, setTheme] = useState('antarctica');

  const getThemeBg = () => {
    switch (theme) {
      case 'antarctica':
        return '#142234';
      case 'mars':
        return '#30221B';
      case 'closet':
        return '#0D0D0D';
      case 'shadow':
        return 'radial-gradient(circle, #000 0%, #1F0431 100%)';
      default:
        return '#142234';
    }
  }

  return (
    <OverlayContext.Consumer>
      {({ uniqueState, setUniqueState }) => (
        <Scene
          name="confinement"
          ref={sceneEl}
          background={getThemeBg()}
        >
          <VolumeController audio={music}>
            {(uniqueState === 'breakout') && (
              <VideoFrame theme={theme} animationDelay={0.64} />
            )}
            <BreakoutDialog
              theme={theme}
              visible={(uniqueState !== 'breakout')}
              onChange={setTheme}
              onSubmit={() => setUniqueState('breakout')}
            />
          </VolumeController>
        </Scene>
      )}
    </OverlayContext.Consumer>
  )
}

export default Confinement;
