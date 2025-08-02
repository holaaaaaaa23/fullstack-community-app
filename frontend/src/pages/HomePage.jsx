import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import Spinner from '../components/Spinner';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
        setPosts(data);
      } catch (err) {
        setError('Could not fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, { content }, config);
      setContent('');
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      setPosts(data);
    } catch (error) {
      console.error('Failed to create post', error);
      alert('Failed to create post.');
    }
  };

  return (
    <div>
      <h1>Home Feed</h1>

      {userInfo && (
        <div className={styles.formContainer}>
          <form onSubmit={submitHandler}>
            <textarea
              className={styles.textarea}
              rows="3"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit" className={styles.button}>
              Post
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default HomePage;