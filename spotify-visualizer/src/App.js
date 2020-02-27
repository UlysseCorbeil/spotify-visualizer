import React, { Component } from 'react';

import LoginScreen from './components/LoginScreen';

import styled from 'styled-components';

const AppContainer = styled.div`
    height: 100%;
    min-height: 100vh;
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
