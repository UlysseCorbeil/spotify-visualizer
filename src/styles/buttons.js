import styled from 'styled-components';
import theme from './theme';
const { colors, display } = theme;

const Button = styled.button`
  cursor: pointer;
  background-color: ${colors.green};
  color: white;
  padding: 1rem;
  border: 0;
  &:focus,
  &:active {
    outline: 0;
  }
`;

export default Button;
