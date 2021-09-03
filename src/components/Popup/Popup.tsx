import React, { useState, useEffect } from 'react';
import { css } from 'styled-components';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { PopupBg } from '../../ui/PopupBg';
import { Subtitle } from '../../ui/Subtitle';
import { Title } from '../../ui/Title';
import { Text } from '../../ui/Text';
import { Comments } from '../Comments/Comments';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import { Input } from '../../ui/Input';
import { Clickable } from '../../ui/Clickable';
import { actions, selectors } from '../../redux/ducks';

import { colors } from '../../styles/colors';

interface PopupProps {
  cardName: string,
  cardId: number,
  colName: string,
}

export const Popup:
React.FunctionComponent<PopupProps> = (
  {
    cardName, cardId, colName,
  }: PopupProps,
) => {
  const dispatch = useDispatch();
  const cardTitle = useSelector(selectors.cards.selectCardName(cardId));
  const description = useSelector(selectors.cards.selectCardDesc(cardId));
  const author = useSelector(selectors.cards.selectCardAuthor(cardId));

  const [popupShow, setPopupShow] = useState(false);
  const [descEditHidden, setDescEditHidden] = useState(true);
  const [editShow, setEditShow] = useState(false);
  useEffect(() => {
    document.addEventListener('keydown', escFunc);
  }, []);

  const cardRenameSubmit = (newCardName: { text: string; }): void => {
    if (newCardName.text) {
      dispatch(actions.cards.editCard({ id: cardId, name: newCardName.text }));
      setEditShow(false);
    }
  };
  const clickDesc = (): void => {
    if (descEditHidden === true) {
      setDescEditHidden(false);
    }
  };
  const cardDescEditSubmit = (newDesc: { text: string; }): void => {
    if (newDesc.text && newDesc.text !== description) {
      dispatch(actions.cards.editDescription(
        { id: cardId, desc: newDesc.text },
      ));
      setDescEditHidden(true);
      newDesc.text = '';
    } else {
      setDescEditHidden(false);
    }
  };
  const editClick = ():void => {
    setEditShow(true);
  };
  const escFunc = (event: KeyboardEvent): void => {
    if (event.keyCode === 27) {
      setPopupShow(false);
      setEditShow(false);
    }
  };

  return (
    <>
      <Clickable
        onClick={() => { setPopupShow(true); }}
      >
        <Title
          text={cardTitle}
        />
      </Clickable>
      <Button
        text="Edit"
        danger
        onClick={editClick}
      />

      <PopupBg
        show={editShow}
        onClick={() => { setEditShow(false); }}
      >
        <Container
          onClick={(e) => e.stopPropagation()}
          css={CSS.editContainer}
        >
          <Container
            onClick={(e) => e.stopPropagation()}
            css={CSS.editContainerBg}
          >
            <Subtitle
              text="Edit card name"
            />
            <span
              className="material-icons-outlined click"
              onClick={() => { setEditShow(false); }}
              onKeyPress={() => { setEditShow(false); }}
              role="button"
              tabIndex={0}
            >
              close
            </span>
          </Container>
          <Form
            initialValues={{ text: cardName }}
            onSubmit={cardRenameSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="text">
                  {(p) => (
                    <Input
                      value={p.input.value}
                      onChange={p.input.onChange}
                    />
                  )}
                </Field>
              </form>
            )}
          />
        </Container>
      </PopupBg>

      <PopupBg
        show={popupShow}
        onClick={() => { setPopupShow(false); }}
      >
        <Container
          onClick={(e) => e.stopPropagation()}
          css={CSS.containerBg}
        >
          <Container
            onClick={(e) => e.stopPropagation()}
            css={CSS.popupContainer}
          >
            <Title text={cardTitle} />
            <span
              className="material-icons-outlined click"
              onClick={() => { setPopupShow(false); }}
              onKeyPress={() => { setPopupShow(false); }}
              role="button"
              tabIndex={0}
            >
              close
            </span>
          </Container>

          <Text
            text={`Created by ${author} in column "${colName}"`}
          />

          <Container
            css={CSS.descFormContainer}
          >
            <Subtitle text="Description" />
            <Form
              initialValues={{ text: description }}
              onSubmit={cardDescEditSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="text">
                    {(p) => (
                      <Input
                        placeholder="Type description here..."
                        onChange={p.input.onChange}
                        value={p.input.value}
                        css={css`width: 100%;`}
                        hidden={descEditHidden}
                      />
                    )}
                  </Field>
                  <Button text="Edit description" onClick={clickDesc} />
                </form>
              )}
            />
          </Container>
          <Container
            css={CSS.descContainer}
          >
            <Text
              size="18px"
              text={description}
            />
            <Clickable
              onClick={
                () => { dispatch(actions.cards.removeDescription(cardId)); }
              }
            >
              <span
                className="material-icons-outlined"
              >
                close
              </span>
            </Clickable>
          </Container>
          <Comments
            cardId={cardId}
          />
        </Container>
      </PopupBg>
    </>
  );
};

const CSS = {
  editContainer: css`
      flex-direction: column;
      background: ${colors.semiLight};
      padding: 1rem;
      width: 50%;
  `,
  editContainerBg: css`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background: ${colors.semiLight};
    width: 100%;
  `,
  containerBg: css`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: ${colors.semiLight};
    padding: 1rem;
    width: 50%;
  `,
  popupContainer: css`
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    background: ${colors.semiLight};
    width: 100%;
  `,
  descFormContainer: css`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0;
  `,
  descContainer: css`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
    flex-wrap: nowrap;
  `,
};
