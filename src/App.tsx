import React from 'react';
import { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { actions, selectors } from './redux/ducks';
import Desc from './components/Desc/Desc';
import { PopupBg } from './ui/PopupBg';
import { Title } from './ui/Title';
import { Subtitle } from './ui/Subtitle';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Input } from './ui/Input';

const App: React.FunctionComponent = () => {
  const user = useSelector(selectors.user.selectUsername);
  const dispatch = useDispatch();

  const authorisationSubmit = (username: { text: string; }): void => {
    if (username.text !== '') {
      dispatch(actions.user.AuthoriseUser(username.text));
    }
  };

  if (!user) {
    return (
      <PopupBg show>
        <Container
          onClick={(e) => e.stopPropagation()}
          css={css`
            flex-direction: column;
            background: #C1FFD6;
            padding: 1rem;
            width: 50%;
          `}
        >
          <Title text="Not authorised!" />
          <Subtitle text="What's your name?" />
          <Form
            onSubmit={authorisationSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="text">
                  {(p) => (
                    <Input
                      value={p.input.value}
                      onChange={p.input.onChange}
                      css={css`width: 50%`}
                    />
                  )}
                </Field>
                <Button text="Lets go!" />
              </form>
            )}
          />
        </Container>
      </PopupBg>
    );
  }

  return (
    <Desc />
  );
};

export default App;
