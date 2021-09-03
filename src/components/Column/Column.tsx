import React, { useState } from 'react';
import { css } from 'styled-components';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../../ui/Container';
import { InputForm } from '../AddCardForm/AddCardForm';
import { CardList } from '../CardList/CardList';
import { Title } from '../../ui/Title';
import { Clickable } from '../../ui/Clickable';
import { Input } from '../../ui/Input';
import { actions, selectors } from '../../redux/ducks';
import { colors } from '../../styles/colors';

interface ColumnProps {
  colName: string,
  colId: number,
}

export const Column: React.FunctionComponent<ColumnProps> = (
  { colName, colId }: ColumnProps,
) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectors.user.selectUsername);

  const [titleEditHide, setTitleEditHide] = useState(true);

  const addCardHandler = (cardName: string):void => {
    dispatch(actions.cards.addCard(
      { name: cardName, author: currentUser, column: colId },
    ));
  };
  const renameColumnSubmit = (
    newTitle: { text: string },
  ): void => {
    if (newTitle.text) {
      dispatch(
        actions.columns.RenameColumn({ id: colId, title: newTitle.text }),
      );
      newTitle.text = '';
      setTitleEditHide(true);
    }
  };

  return (
    <Container
      css={CSS.column}
    >
      <Container
        css={CSS.columnInfo}
      >
        <Title text={colName} />
        <Clickable
          onClick={() => { setTitleEditHide(!titleEditHide); }}
        >
          <span className="material-icons-outlined">
            edit
          </span>
        </Clickable>
      </Container>
      <Form
        initialValues={{ text: colName }}
        onSubmit={renameColumnSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="text">
              {(p) => (
                <Input
                  value={p.input.value}
                  onChange={p.input.onChange}
                  hidden={titleEditHide}
                />
              )}
            </Field>
          </form>
        )}
      />
      <CardList
        colName={colName}
        colId={colId}
      />
      <InputForm onAdd={addCardHandler} />
    </Container>
  );
};

const CSS = {
  column: css`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2rem 1rem 0;
    width: 23%;
    background: ${colors.semiLight};
  `,
  columnInfo: css`
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
  `,
};
