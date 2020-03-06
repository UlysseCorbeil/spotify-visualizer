import React, { Component } from 'react';

import styled from 'styled-components';
import theme from '../styles/theme'
const { colors, display } = theme;

const ProfileContainer = styled.section`
  ${display.flexCenter}
  background-color: ${colors.black}
`;

class Profile extends Component {

  render() {

    return (
      
      <ProfileContainer>

        <h1>TEST PAGE PROFILE</h1>

      </ProfileContainer>

    );
  }
}

export default Profile;

