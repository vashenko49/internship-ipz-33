import React from 'react';
import StyledLink from '../Styled/StyledLink';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room, loseSession }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <StyledLink onClick={loseSession} to={'/'}>
        <img src={closeIcon} alt="close icon" />
      </StyledLink>
    </div>
  </div>
);

export default InfoBar;
