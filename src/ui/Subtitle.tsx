import React from 'react';
import styled from 'styled-components';

export const Subtitle: React.FC<SubtitleProps> = (
  { text }: SubtitleProps,
) => (
  <SubtitleStyled>
    {text}
  </SubtitleStyled>
);

interface SubtitleProps {
  text: string,
}

const SubtitleStyled = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
`;
