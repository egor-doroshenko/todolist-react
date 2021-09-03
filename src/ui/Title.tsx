import React from 'react';
import styled from 'styled-components';

export const Title = ({ text }: TitleProps): JSX.Element => (
  <TitleStyled>
    {text}
  </TitleStyled>
);

interface TitleProps {
  text: string
}

const TitleStyled = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;
