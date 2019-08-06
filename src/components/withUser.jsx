import React from 'react';
import { UserContext } from '../Providers/UserProvider';

const withUser = Component => {
  const WrapperComponent = props => {
    return (
      <UserContext.Consumer>
        {user => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };

  WrapperComponent.displayName = 'withUser';

  return WrapperComponent;
};

export default withUser;
