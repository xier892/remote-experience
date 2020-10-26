import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useKeyPressEvent } from 'react-use';
import OverlayContext from 'context/OverlayContext';
import Top from 'components/Overlay/Top';
import Info from 'components/Overlay/Info';
import LeaveModal from 'components/Overlay/LeaveModal';
import Button from 'components/Button';
import { ReactComponent as Location } from 'media/image/location.svg';
import { ReactComponent as ArrowLeft } from 'media/image/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'media/image/arrow-right.svg';
import playAudioInstance from 'api/playAudioInstance';
import cancel from 'media/audio/cancel';
import { click3 } from 'media/audio/click';
import expand from 'media/audio/expand';
import collapse from 'media/audio/collapse';
import './overlay.css';
import './backgrounds/noise.css';
import './backgrounds/groovepaper.css';

function ProgressBar({ index, lastIndex }) {
  return (
    <div className="progressContainer">
      <div
        className="progress"
        style={{ transform: `scaleX(${index / (lastIndex - 1)})` }}
      />
    </div>
  );
}

const BarButton = React.forwardRef(({ children, name, disabled = false, callback, title }, ref) => (
  <button
    className="barButton"
    name={name}
    onMouseDown={() => playAudioInstance(click3)}
    onClick={callback}
    disabled={disabled}
    title={title}
    ref={ref}
  >
    {children}
  </button>
));

function Overlay({ disabled = false, callbacks = {} }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const {
    initiated,
    index,
    lastIndex,
    uniqueState,
    setUniqueState
  } = useContext(OverlayContext);

  const toggleInfo = useCallback((state) => {
    const show = () => {
      if (!infoVisible) {
        setInfoVisible(true);
        playAudioInstance(expand);
      }
    };

    const hide = () => {
      if (infoVisible) {
        setInfoVisible(false);
        playAudioInstance(collapse);
        if (uniqueState === 'onboard') setUniqueState(null);
      }
    };

    switch (state) {
      case 'show':
        show();
        break;
      case 'hide':
        hide();
        break;
      default:
        if (infoVisible) {
          hide();
        } else if (!infoVisible && document.activeElement.tagName !== ('INPUT')) {
          show();
        }
    }
  }, [infoVisible, setUniqueState, uniqueState]);

  const toggleLeave = (state) => {
    const show = () => {
      if (!leaving) {
        setLeaving(true);
      }
    };

    const hide = () => {
      if (leaving) {
        setLeaving(false);
        playAudioInstance(cancel);
      }
    };

    switch (state) {
      case 'show':
        show();
        break;
      case 'hide':
        hide();
        break;
      default:
        if (leaving) {
          hide();
        } else {
          show();
        }
    }
  };

  const toggleModal = useCallback((type, boolean = !modalVisible) => {
    const action = (boolean) ? 'show' : 'hide';
    if (boolean) {
      callbacks.modal();
    } else {
      callbacks.dismissModal();
    }

    setModalVisible(boolean);

    switch (type) {
      case 'info':
        toggleInfo(action);
        break;
      case 'all':
        toggleInfo(action);
        break;
      default:
        toggleInfo(action);
    }
  }, [modalVisible, callbacks, toggleInfo]);

  const handleLeave = () => {
    setModalVisible(true);
    setLeaving(false);
    callbacks.leave();
    setTimeout(() => {
      setModalVisible(false);
    }, 1000);
  };

  useKeyPressEvent('Escape', () => toggleModal('all', false));
  useKeyPressEvent('i', () => {
    if (document.activeElement.tagName !== 'INPUT' && !leaving) toggleModal('info');
  });

  useEffect(() => {
    if (uniqueState === 'onboard') {
      toggleModal('info', true);
    }
  }, [toggleInfo, toggleModal, uniqueState])

  return (
    <div className={(disabled) ? 'overlay barDisabled' : 'overlay'}>
      {initiated && (<Top />)}

      <Info
        visible={infoVisible}
        onDismiss={() => toggleModal('info', false)}
      />

      <nav className={`bar${(uniqueState === 'inaccessibility') ? ' inaccessible' : ''}`}>
        {/* leave */}
        {leaving && (
          <LeaveModal
            onLeave={handleLeave}
            onCancel={() => toggleLeave('hide')}
          />
        )}

        {/* progress */}
        <ProgressBar index={index} lastIndex={lastIndex} />

        {(!leaving) && (
          <>
            {/* prev/next */}
            <div className="buttonGroup">
              {/* prev */}
              {(index > 0) && (
                <BarButton name="previous"
                  callback={() => {
                    setUniqueState(null);
                    callbacks.prev();
                  }}
                  disabled={(index <= 1 || infoVisible)}
                  title="Return to the previous scene"
                >
                  <ArrowLeft />
                  Prev
                </BarButton>
              )}
              {/* next */}
              {initiated && (
                <BarButton name="next"
                  callback={() => {
                    setUniqueState(null);
                    callbacks.next();
                  }}
                  disabled={(index === lastIndex - 1 || infoVisible)}
                  title="Go to the next scene"
                >
                  <ArrowRight />
                  Next
                </BarButton>
              )}
            </div>
            {/* info toggle */}
            <BarButton
              name="info"
              callback={() => toggleModal('info', true)}
              disabled={(infoVisible)}
              title="Click or press the “i” key to open"
            >
              <Location />
              Where am I?
            </BarButton>
          </>
        )}

        {/* leave */}
        {(index > 0) && (
          <>
            {(leaving) ? (
              <Button
                className="leaveButton cancel"
                callback={() => toggleLeave('hide')}
              >
                Cancel
              </Button>
            ) : (
              <Button
                className={`leaveButton${(uniqueState === 'breakout') ? ' breakoutButton' : ''}`}
                callback={(uniqueState === 'breakout') ? () => setUniqueState(null) : () => toggleLeave('show')}
                disabled={(infoVisible)}
              >
                {(uniqueState === 'breakout') ? 'Leave Room' : 'Leave'}
              </Button>
            )}
          </>
        )}
      </nav>

      {/* vignette */}
      <div
        className={(modalVisible) ? `vignette dim${(initiated) ? ' noise' : ''}` : `vignette${(initiated) ? ' noise' : ''}`}
        style={{
          zIndex: (leaving) ? '-1' : undefined,
          pointerEvents: (leaving) ? 'auto' : undefined
        }}
        onClick={() => {
          toggleModal('all', false);
          toggleLeave('hide');
        }}
      />
    </div>
  );
}

export default Overlay;
