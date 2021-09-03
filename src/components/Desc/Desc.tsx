import React from 'react';
import { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { Container } from '../../ui/Container';
import { Column } from '../Column/Column';
import { selectors } from '../../redux/ducks';
import { colors } from '../../styles/colors';

const Desc: React.FunctionComponent = () => {
  const colsList = useSelector(selectors.columns.selectColumns);

  return (
    <Container
      css={CSS.container}
    >
      {colsList.map((col) => (
        <Column colName={col.title} colId={col.id} key={col.id} />
      ))}
    </Container>
  );
};
export default Desc;

const CSS = {
  container: css`
    max-width: 100vw;
    background: ${colors.semiDark};
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 1rem;
  `,
};
