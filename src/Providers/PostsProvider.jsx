import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collectionIdsAndDocs } from '../utils';

export const PostContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const unsubscribeFromFirestore = async () => {
    firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectionIdsAndDocs);
      setPosts(posts);
    });
  };

  useEffect(() => {
    unsubscribeFromFirestore();
    return () => {
      unsubscribeFromFirestore();
    };
  }, []);

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

export default PostsProvider;
