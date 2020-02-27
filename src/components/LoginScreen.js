import React, { Component } from 'react';
import styled from 'styled-components/macro';

import theme from '../styles/theme';
import Button from '../styles/buttons';

const { colors, display } = theme;

const Container = styled.div`
  width: 100%;
  ${display.flexCenter}
  flex-flow: column-wrap;
`;


class LoginScreen extends Component {

  render() {
    return(
      <Container>

        <h1>Please log in your account</h1>

        <Button> Login </Button>

      </Container>
    );
  }
}


export default LoginScreen;
