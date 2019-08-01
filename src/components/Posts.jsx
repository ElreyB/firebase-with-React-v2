import React from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostContext } from '../Providers/PostsProvider';

const Posts = () => {
  const posts = React.useContext(PostContext);
  console.warn({ posts });
  return (
    <section className='Posts'>
      <AddPost />
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
