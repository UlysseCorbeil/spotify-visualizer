import styled from 'styled-components';
import theme from './theme';
const { colors, display } = theme;

const Button = styled.button`
  cursor: pointer;
  background-color: ${colors.green};
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 80%;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  border-radius: 1.5em;
  border: 0;
  transition: all 150ms ease-out;
  transform: scale(1);
  &:focus,
  &:active {
    outline: 0;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export default Button;
