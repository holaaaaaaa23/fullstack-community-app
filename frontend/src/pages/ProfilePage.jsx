import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import Spinner from '../components/Spinner';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/user/${userId}`
        );
        setPosts(data);
      } catch (error) {
        setError('Could not fetch user posts.');
        console.error('Failed to fetch user posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      <h1>User's Posts</h1>
      <hr />
      {loading ? (
        <Spinner />
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      ) : posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>This user has no posts yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;