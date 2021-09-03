import React from 'react';
import styled from 'styled-components';

export const PopupBg: React.FC<PopupBgProps> = (
  { show, onClick, children }: PopupBgProps,
) => (
  <PopupBgStyled
    show={show}
    onClick={onClick}
  >
    {children}
  </PopupBgStyled>
);

interface PopupBgProps {
  show: boolean
  onClick?: (event: React.MouseEvent) => void
  children: JSX.Element
}
PopupBg.defaultProps = {
  onClick: (e) => e.stopPropagation(),
};

const PopupBgStyled = styled.div<PopupBgProps>`
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.show ? '1' : '0')};
  pointer-events: ${(props) => (props.show ? 'all' : 'none')};
  z-index: ${(props) => (props.show ? '2' : '-1')};
  transition: 0.4s;
`;
