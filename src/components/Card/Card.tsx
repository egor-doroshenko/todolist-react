import React from 'react';
import { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import { Text } from '../../ui/Text';
import { Popup } from '../Popup/Popup';
import { actions, selectors } from '../../redux/ducks';

import { colors } from '../../styles/colors';

interface CardProps {
  cardName: string,
  colName: string,
  id: number,
}

export const Card:
React.FunctionComponent<CardProps> = ({
  cardName,
  colName,
  id,
}: CardProps) => {
  const dispatch = useDispatch();

  const commsNum = useSelector(
    selectors.comments.selectCommentsByCardId(id),
  ).length;

  return (
    <Container
      css={CSS.container}
    >
      <Popup
        cardName={cardName}
        colName={colName}
        cardId={id}
      />
      <Text size="16px" text={`Comments: ${commsNum}`} />
      <Button
        text="Delete card"
        danger
        onClick={() => { dispatch(actions.cards.removeCard(id)); }}
      />
    </Container>
  );
};

const CSS = {
  container: css`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: ${colors.middle};
    padding: 0.5rem 0.5rem 0;
    width: 100%;
  `,
};
