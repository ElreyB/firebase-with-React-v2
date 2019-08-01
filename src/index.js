import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';

import PostsProvider from './Providers/PostsProvider';
import UserProvider from './Providers/UserProvider';

import { BrowserRouter as Router } from 'react-router-dom';

const RootComponent = () => {
  return (
    <Router>
      <UserProvider>
        <PostsProvider>
          <Application />
        </PostsProvider>
      </UserProvider>
    </Router>
  );
};

render(<RootComponent />, document.getElementById('root'));
