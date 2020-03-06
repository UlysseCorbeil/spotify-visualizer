import React, { Component } from 'react';

import LoginScreen from './components/LoginScreen';
import Profile from './components/Profile';

import styled from 'styled-components';
import theme from './styles/theme'
const { colors, display } = theme;

const AppContainer = styled.div`
  font-family: Helvetica Neue;
  height: 100%;
  ${display.flexCenter}
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.black}
`;

class App extends Component {

  render() {

    const { isLoggedIn } = this.props;

    return (
      
      <AppContainer>

        { isLoggedIn ? <Profile /> : <LoginScreen /> }
      </AppContainer>

    );
  }
}

export default App;
