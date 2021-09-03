import React from 'react';
import styled, { CSSProp } from 'styled-components';

export const Text: React.FC<TextProps> = (
  {
    size, bold, text, hidden, css,
  }: TextProps,
) => (
  <TextStyled
    size={size}
    bold={bold}
    hidden={hidden}
    $CSS={css}
  >
    {text}
  </TextStyled>
);

interface TextProps {
  size?: string,
  bold?: boolean,
  text?: string,
  hidden?: boolean,
  css?: CSSProp,
}
Text.defaultProps = {
  bold: false,
  size: '18px',
  text: '',
  hidden: false,
  css: {},
};

type TextStyledProps = {
  $CSS?: CSSProp,
  size?: string,
  bold?: boolean,
}

const TextStyled = styled.p<TextStyledProps>`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  margin-bottom: 1rem;
  opacity: ${(props) => (props.hidden ? '0' : '1')};
  pointer-events: ${(props) => (props.hidden ? 'none' : 'all')};
  transition: 0.4s;
  ${({ $CSS }) => $CSS}
`;

TextStyled.defaultProps = {
  $CSS: {},
  size: '18px',
  bold: false,
};
