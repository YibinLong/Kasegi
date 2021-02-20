import React from 'react';
import { auth, useUser } from '../api'; 
import config from '../config';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const { email, password } = config.tests;

const User = (props) => {
  const user = useUser();

  React.useEffect(() => {
  }, [user])

  return (
    <div>
      {user && user.email && 'user-email'}
    </div>
  )
}

it.skip('signs up', done => {
  auth.createUser({email: email, password: password})
    .then(done())
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        done();
      } else {
        done(error);
      }
    })
});

it.skip('signs in', async () => {
  render(<User />);
  await act(() => auth.signIn({email, password}))
  const div = screen.getByText('user-email');
  expect(div).toBeInTheDocument();
})