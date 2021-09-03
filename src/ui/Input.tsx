import React from 'react';
import styled, { CSSProp } from 'styled-components';

export const Input: React.FC<InputProps> = (
  {
    value,
    borderRadiusSides,
    onChange,
    onKeyPress,
    placeholder,
    hidden,
    css,
    name,
  }: InputProps,
) => (
  <InputStyled
    value={value}
    borderRadiusSides={borderRadiusSides}
    onChange={onChange}
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    hidden={hidden}
    $CSS={css}
    name={name}
  />
);

interface InputProps {
  value?: string
  borderRadiusSides?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  hidden?: boolean
  css?: CSSProp
  name?: string
}
Input.defaultProps = {
  value: '',
  borderRadiusSides: 'all',
  placeholder: 'Type here',
  hidden: false,
  css: {},
  name: '',
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => (event ? null : null),
  onKeyPress: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => (event ? null : null),

};

type InputStyledProps = {
  $CSS?: CSSProp,
  borderRadiusSides?: string,
}

const InputStyled = styled.input<InputStyledProps>`
  font-size: 18px;
  padding: 0.5rem;
  ${(props) => (
    props.borderRadiusSides === 'left'
      ? 'border-top-left-radius: 10px; border-bottom-left-radius: 10px;' : ''
  )}
   ${(props) => (
    props.borderRadiusSides === 'all' ? 'border-radius: 10px;' : ''
  )}
  border: none;
  width: 100%;
  height: 50px;
  margin-bottom: 0.5rem;

  opacity: ${(props) => (props.hidden ? '0' : '1')};
  width: ${(props) => (props.hidden ? '0' : props.width)};
  height: ${(props) => (props.hidden ? '0' : '50px')};
  pointer-events: ${(props) => (props.hidden ? 'none' : 'auto')};
`;

InputStyled.defaultProps = {
  $CSS: {},
};
