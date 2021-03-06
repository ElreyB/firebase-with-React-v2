import React, { Component } from 'react';
import Authentication from './Authentication';

import Posts from './Posts';
import UserProfile from './UserProfile';
import PostPage from './PostPage';
import { Switch, Route, Link } from 'react-router-dom';

class Application extends Component {
  render() {
    return (
      <main className='Application'>
        <Link to='/'>
          <h1>Think Piece</h1>
        </Link>
        <Authentication />
        <Switch>
          <Route exact path='/' component={Posts} />
          <Route path='/profile' component={UserProfile} />
          <Route path='/post/:id' component={PostPage} />
        </Switch>
      </main>
    );
  }
}

export default Application;
