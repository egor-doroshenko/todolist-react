import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { css } from 'styled-components';
import { Container } from '../../ui/Container';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';

interface InputFormProps {
  onAdd?(cardName: string): void
}

export const InputForm: React.FunctionComponent<InputFormProps> = (props) => {
  const [emptyForm, setEmptyForm] = useState('');
  return (
    <Form
      onSubmit={(card) => {
        if (card.title) {
          props.onAdd?.(card.title);
          setEmptyForm('');
        } else {
          setEmptyForm('Please, add card title first');
        }
        card.title = '';
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Container
            css={CSS.container}
          >
            <Field name="title">
              {(p) => (
                <Input
                  onChange={p.input.onChange}
                  value={p.input.value}
                  placeholder="Type here..."
                  borderRadiusSides="left"
                  name="name"
                />
              )}
            </Field>
            <Button
              borderRadiusSides="right"
              text="Add"
              css={CSS.button}
            />
          </Container>
          <Text text={emptyForm} />
        </form>
      )}
    />
  );
};

const CSS = {
  container: css`
    flex-wrap: nowrap;
    padding: 0;
    width: 100%;
    align-items: flex-start;
  `,
  button: css`
    height: 50px;
    margin-bottom: 0;
  `,
};
