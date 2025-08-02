import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams(); // Gets the userId from the URL

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/posts/user/${userId}`
        );
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch user posts', error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      {/* We could fetch and display user's name and bio here too */}
      <h1>User's Posts</h1>
      <hr />
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>This user has no posts yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;