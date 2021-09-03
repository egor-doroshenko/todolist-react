import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'styled-components';
import { actions, selectors } from '../../redux/ducks';
import { colors } from '../../styles/colors';
import { Button } from '../../ui/Button';
import { Container } from '../../ui/Container';
import { Input } from '../../ui/Input';
import { Text } from '../../ui/Text';

interface AddCommentFormProps {
  cardId: number,
}

export const AddCommentForm: React.FunctionComponent<AddCommentFormProps> = (
  { cardId }: AddCommentFormProps,
) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectors.user.selectUsername);

  const [emptyFormMsg, setEmptyFormMsg] = useState('');

  const addCommentSubmit = (comm: { text: string; }):void => {
    if (comm.text) {
      dispatch(actions.comments.addComment(
        {
          author: currentUser,
          text: comm.text,
          card: cardId,
        },
      ));
      comm.text = '';
      setEmptyFormMsg('');
    } else {
      setEmptyFormMsg('Please, add comment first');
    }
  };
  return (
    <Form
      onSubmit={addCommentSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
        >
          <Container
            css={CSS.formContainer}
          >
            <Field name="text">
              {(p) => (
                <Input
                  onChange={p.input.onChange}
                  value={p.input.value}
                  placeholder="Type comment here"
                  css={CSS.input}
                />
              )}
            </Field>

            <Button
              text="Add comment"
            />
            <Text text={emptyFormMsg} />
          </Container>
        </form>
      )}
    />
  );
};

const CSS = {
  formContainer: css`
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `,
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
};
