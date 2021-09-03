import React from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { colors } from '../styles/colors';

export const Button: React.FC<ButtonProps> = ({
  danger, onClick, text, borderRadiusSides, css,
} : ButtonProps) => (
  <ButtonStyled
    danger={danger}
    onClick={onClick}
    borderRadiusSides={borderRadiusSides}
    type="submit"
    $CSS={css}
  >
    {text}
  </ButtonStyled>
);

interface ButtonProps {
  danger?: boolean
  onClick?: (event: React.MouseEvent) => void
  text?: string
  borderRadiusSides?: string
  css?: CSSProp,
}
Button.defaultProps = {
  danger: false,
  text: '',
  borderRadiusSides: 'all',
  onClick: (event: React.MouseEvent) => (event ? null : null),
  css: '',
};

type ButtonStyledProps = {
  $CSS?: CSSProp,
  danger?: boolean,
  borderRadiusSides?: string,
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  padding: 0 1rem;

  ${(props) => (
    props.borderRadiusSides === 'right'
      ? 'border-top-right-radius: 10px; border-bottom-right-radius: 10px;' : ''
  )}
   ${(props) => (
    props.borderRadiusSides === 'all' ? 'border-radius: 10px;' : ''
  )}
  border: none;
  background: ${(props) => (props.danger ? colors.danger : colors.dark)};
  width: auto;
  height: auto;
  margin-bottom: 1rem;


  &:hover {
    background: ${
  (props) => (props.danger ? colors.dangerHover : colors.darkHover)
};
  }

  ${({ $CSS }) => $CSS}
`;

ButtonStyled.defaultProps = {
  $CSS: {},
  danger: false,
};
