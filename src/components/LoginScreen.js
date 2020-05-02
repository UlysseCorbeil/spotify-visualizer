import React, { Component } from 'react';
import styled from 'styled-components/macro';

import theme from '../styles/theme';
import Button from '../styles/buttons';

const { colors, display } = theme;

const LOGIN_URI = 'http://localhost:3001/login';

const Container = styled.section`
  width: 100%;
  ${display.flexCenter}
  flex-flow: column wrap;
`;

const LoginTitle = styled.h1`
  color: ${colors.white}
`;


class LoginScreen extends Component {

  render() {
    return(
      <Container>

        <LoginTitle> Please log in your account </LoginTitle>

        <Button
          href={LOGIN_URI}
        > Login </Button>

        {this.props.children}

      </Container>
    );
  }
}


export default LoginScreen;
