import React from 'react';
import { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { Container } from '../../ui/Container';
import { Card } from '../Card/Card';
import { selectors } from '../../redux/ducks';
import { Text } from '../../ui/Text';

type CardListProps = {
  colName: string,
  colId: number,
}

export const CardList:
React.FunctionComponent<CardListProps> = ({
  colName,
  colId,
}: CardListProps) => {
  const cards = useSelector(selectors.cards.selectCardsByColumnId(colId));

  if (cards.length > 0) {
    return (
      <Container
        css={CSS.container}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            cardName={card.name}
            colName={colName}
            id={card.id}
          />
        ))}
      </Container>
    );
  }

  return (
    <Text text="No cards!" />
  );
};

const CSS = {
  container: css`
    padding: 1rem 0;
    width: 100%;
  `,
};
