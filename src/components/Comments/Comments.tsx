import React, { useState } from 'react';
import { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { Container } from '../../ui/Container';
import { Subtitle } from '../../ui/Subtitle';
import { Text } from '../../ui/Text';
import { Input } from '../../ui/Input';
import { Clickable } from '../../ui/Clickable';
import { actions, selectors } from '../../redux/ducks';
import { colors } from '../../styles/colors';
import { AddCommentForm } from '../AddCommentForm/AddCommentForm';

interface CommentsProps {
  cardId: number,
}

export const Comments: React.FunctionComponent<CommentsProps> = (
  {
    cardId,
  } : CommentsProps,
) => {
  const dispatch = useDispatch();
  const comments = useSelector(
    selectors.comments.selectCommentsByCardId(cardId),
  );
  const currentUser = useSelector(selectors.user.selectUsername);

  const [notMyCommId, setNotMyCommId] = useState(0);
  const [commentEditingId, setCommentEditingId] = useState(1);
  const [commentEditingText, setCommentEditingText] = useState('');

  const hideErrorText = (id: number): boolean => {
    if (id === notMyCommId) {
      return false;
    }
    return true;
  };
  const deleteCommentCheck = (author: string, id: number): void => {
    if (currentUser === author) {
      dispatch(actions.comments.removeComment(id));
    } else {
      setNotMyCommId(id);
      setTimeout(() => {
        setNotMyCommId(0);
      }, 3000);
    }
  };
  const commentEditorHide = (
    id: number,
    author: string,
  ): boolean => {
    if (id === commentEditingId) {
      if (currentUser === author) {
        return false;
      }
    }
    return true;
  };
  const setCommentEditingData = (
    id: number, author: string, text: string,
  ): void => {
    setCommentEditingId(id);
    if (currentUser === author) {
      setCommentEditingId(id);
      setCommentEditingText(text);
    } else {
      setNotMyCommId(id);
      setTimeout(() => {
        setNotMyCommId(0);
      }, 3000);
    }
  };
  const editCommentSubmit = (newComm: { text: string; }): void => {
    if (newComm.text) {
      dispatch(actions.comments.editComment(
        { id: commentEditingId, text: newComm.text },
      ));
      setCommentEditingText('');
      setCommentEditingId(0);
      newComm.text = '';
    }
  };

  if (comments.length === 0) {
    return (
      <Container css={CSS.container}>
        <AddCommentForm cardId={cardId} />
        <Text css={CSS.noCommentsText} text="No comments yet!" />
      </Container>
    );
  }

  return (
    <>
      <AddCommentForm cardId={cardId} />

      {comments.map((comm) => (
        <Container
          css={CSS.commentsContainer}
          key={comm.id}
        >
          <Container
            css={CSS.comment}
          >
            <Subtitle text={comm.author} />
            <Text
              text="You can edit and delete your own comments only!"
              bold
              hidden={hideErrorText(comm.id)}
            />
            <span
              className="material-icons-outlined click"
              onClick={() => { deleteCommentCheck(comm.author, comm.id); }}
              onKeyPress={
                    () => { deleteCommentCheck(comm.author, comm.id); }
                  }
              role="button"
              tabIndex={0}
            >
              close
            </span>
          </Container>

          <Container
            css={CSS.commentText}
          >
            <Text
              size="16px"
              text={comm.text}
            />
            <Clickable
              onClick={() => {
                setCommentEditingData(comm.id, comm.author, comm.text);
              }}
            >
              <span className="material-icons-outlined">
                edit
              </span>
            </Clickable>
          </Container>
          <Form
            initialValues={{ text: commentEditingText }}
            onSubmit={editCommentSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="text">
                  {(p) => (
                    <Input
                      hidden={commentEditorHide(comm.id, comm.author)}
                      onChange={p.input.onChange}
                      value={p.input.value}
                    />
                  )}
                </Field>
              </form>
            )}
          />
        </Container>
      ))}

    </>
  );
};

const CSS = {
  input: css`
    width: 100%;
  `,
  commentsContainer: css`
    padding: 1rem 2rem;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    background: ${colors.middle};
  `,
  comment: css`
    width: 100%;
    justify-content: space-between;
  `,
  commentText: css`
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
  `,
  noCommentsText: css`
    text-align: center;
  `,
  container: css`
    width: 100%;
  `,

};
