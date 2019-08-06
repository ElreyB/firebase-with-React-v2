import React from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import { UserContext } from '../Providers/UserProvider';

const Authentication = ({ loading }) => {
  const user = React.useContext(UserContext);
  if (loading) return null;

  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
