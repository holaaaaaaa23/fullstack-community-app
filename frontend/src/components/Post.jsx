import React, { useState, useEffect } from 'react';
import styles from './Post.module.css';
import axios from 'axios';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfo) {
      setIsLiked(post.likes.includes(userInfo._id));
    }
  }, [userInfo, post.likes]);

  const likeHandler = async () => {
    if (!userInfo) {
      alert('You must be logged in to like a post');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/like`, {}, config);
      
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);

    } catch (error) {
      console.error('Failed to like post', error);
    }
  };

  return (
    <div className={styles.post}>
      <h4>{post.user.name}</h4>
      <p>{post.content}</p>
      <div className={styles.actions}>
        <button
          onClick={likeHandler}
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <span>{likes} {likes === 1 ? 'like' : 'likes'}</span>
      </div>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default Post;