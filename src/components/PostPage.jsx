import React, { useState, useEffect } from 'react';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectionIdsAndDocs } from '../utils';
import { withRouter } from 'react-router-dom';
import withUser from './withUser';

const PostPage = ({ match, user }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const postId = match.params.id;
  const postRef = firestore.doc(`posts/${postId}`);
  const commentsRef = postRef.collection('comments');

  const unsubscribFromPost = () => {
    postRef.onSnapshot(async snapshot => {
      const postResult = await collectionIdsAndDocs(snapshot);
      setPost(postResult);
    });
  };

  const unsubscribFromComments = async () => {
    commentsRef.onSnapshot(snapshot => {
      const commentResults = snapshot.docs.map(collectionIdsAndDocs);
      setComments(commentResults);
    });
  };

  useEffect(() => {
    unsubscribFromPost();
    unsubscribFromComments();
  }, []);

  const createComment = comment => {
    commentsRef.add({
      ...comment,
      user
    });
  };

  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} postId={postId} onCreate={createComment} />
    </section>
  );
};

export default withRouter(withUser(PostPage));
