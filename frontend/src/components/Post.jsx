// src/components/Post.jsx
import React from 'react';
import styles from './Post.module.css';

const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <h4>{post.user?.name || 'Anonymous'}</h4>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default Post;