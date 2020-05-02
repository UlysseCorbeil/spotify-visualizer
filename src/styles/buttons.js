import styled from 'styled-components';
import theme from './theme';
const { colors } = theme;

const Button = styled.a`
  cursor: pointer;
  background-color: ${colors.green};
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 3px;
  font-size: 90%;
  font-weight: bolder;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  border-radius: 1.5em;
  border: 0;
  transition: all 150ms ease-out;
  transform: scale(1);
  &:focus,
  &:active {
    outline: 0;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export default Button;
