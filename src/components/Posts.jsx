import React from 'react';
import Post from './Post';
import AddPost from './AddPost';
import { PostContext } from '../Providers/PostsProvider';

const Posts = () => {
  const posts = React.useContext(PostContext);
  return (
    <section className='Posts'>
      <AddPost />
      {posts.map(post => {
        return <Post key={post.id} {...post} />;
      })}
    </section>
  );
};

export default Posts;
