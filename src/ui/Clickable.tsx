import React from 'react';
import styled from 'styled-components';

export const Clickable: React.FC<ClickableProps> = (
  {
    children, onClick,
  }: ClickableProps,
) => (
  <ClickableStyled
    onClick={onClick}
  >
    {children}
  </ClickableStyled>
);

interface ClickableProps {
  children: JSX.Element,
  onClick?: (event: React.MouseEvent) => void,

}
Clickable.defaultProps = {
  onClick: (e) => e.stopPropagation(),
};

const ClickableStyled = styled.div<ClickableProps>`
  cursor: pointer;
`;
