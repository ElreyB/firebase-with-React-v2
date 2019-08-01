import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectionIdsAndDocs } from '../utils';

export const PostContext = createContext();

class PostsProvider extends Component {
  state = {
    posts: []
  };

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectionIdsAndDocs);
        this.setState({ posts });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts } = this.state;
    const { children } = this.props;

    return (
      <PostContext.Provider value={posts}>{children}</PostContext.Provider>
    );
  }
}

export default PostsProvider;
