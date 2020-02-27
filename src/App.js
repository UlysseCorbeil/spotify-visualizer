import React, { Component } from 'react';

import LoginScreen from './components/LoginScreen';

import styled from 'styled-components';
import theme from './styles/theme'
const { colors, display } = theme;

const AppContainer = styled.div`
  height: 100%;
  ${display.flexCenter}
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.black}
`;

class App extends Component {

  render() {

    return (
      
      <AppContainer>

        <LoginScreen />

      </AppContainer>

    );
  }
}

export default App;
