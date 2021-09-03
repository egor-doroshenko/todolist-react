import React from 'react';
import styled, { CSSProp } from 'styled-components/macro';

export const Container: React.FC<ContainerProps> = (
  {
    children,
    onClick,
    css,
  }: ContainerProps,
) => (
  <ContainerStyled
    onClick={onClick}
    $CSS={css}
  >
    {children}
  </ContainerStyled>
);

interface ContainerProps {
  children?: JSX.Element[],
  onClick?: (event: React.MouseEvent) => void,
  css: CSSProp
}
Container.defaultProps = {
  onClick: (e) => e.stopPropagation(),
  children: [<></>],
};

type ContainerStyledProps = {
  $CSS?: CSSProp,
}

const ContainerStyled = styled.div<ContainerStyledProps>`
  width: auto;
  height: fit-content;
  height: auto;
  background: none;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: '0.5rem 1rem';
  margin-bottom: 1rem;
  border-radius: 10px;
  ${({ $CSS }) => $CSS}
`;

ContainerStyled.defaultProps = {
  $CSS: {},
};
