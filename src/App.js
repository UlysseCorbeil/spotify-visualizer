import React, { Component } from 'react';

import LoginScreen from './components/LoginScreen';
import Profile from './components/Profile';

import styled, { createGlobalStyle } from 'styled-components';
import { cssReset } from './styles/reset'

import AccessToken from './spotify/AccessToken';

import theme from './styles/theme';
const { colors, display } = theme;

const GlobalStyle = createGlobalStyle`
  ${cssReset}
`;

const AppContainer = styled.div`
  font-family: Roboto;
  height: 100%;
  ${display.flexCenter}
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.black}
`;

class App extends Component {

  constructor () {
    super();
    this.state = {
      accessToken: ''
    }
  }

  componentDidMount () {
    this.setState({
      accessToken: AccessToken.getAccessToken()
    });
  }

  render() {

    const { accessToken } = this.state;

    return (
      
      <AppContainer>

        <GlobalStyle />

        { accessToken ? <Profile /> : <LoginScreen /> } 
      </AppContainer>

    );
  }
}

export default App;
