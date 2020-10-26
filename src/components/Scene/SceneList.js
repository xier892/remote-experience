import React from 'react';
import Surveillance from 'components/Scene/Surveillance';
import Discord from 'components/Scene/Discord';
import Grima from 'components/Scene/Grima';
import Inaccessibility from 'components/Scene/Inaccessibility';
import Marginalia from 'components/Scene/Marginalia';
import Confinement from 'components/Scene/Confinement';
import Blackout from 'components/Scene/Blackout';

const SceneNames = [
  'entry',
  'surveillance',
  'discord',
  'grima',
  'inaccessibility',
  'marginalia',
  'confinement',
  'blackout'
];

function SceneList() {
  return [
    (<Surveillance key="surveillance" />),
    (<Discord key="discord" />),
    (<Grima key="grima" />),
    (<Inaccessibility key="inaccessibility" />),
    (<Marginalia key="marginalia" />),
    (<Confinement key="confinement" />),
    (<Blackout key="blackout" />)
  ];
}

const SceneCount = SceneNames.length;

export default SceneList;
export { SceneCount, SceneNames };
