// components/ThreadCircle.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  userId: string;
  profile: string;
  username: string;
}

interface ThreadCircleProps {
  username: string;
}

const ThreadCircle: React.FC<ThreadCircleProps> = ({ username }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://threads-by-instagram-fast.p.rapidapi.com/users/id', {
          params: { username },
          headers: {
            'X-RapidAPI-Key': '7dd1c7dee4mshcfec6817a02ae0cp191b12jsn491b5cf51ed9',
            'X-RapidAPI-Host': 'threads-by-instagram-fast.p.rapidapi.com',
          },
        });

        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as axios.AxiosError;
          setError(`Error: ${axiosError.message}, Status: ${axiosError.response?.status}`);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    if (username && username.trim() !== '') {
      fetchUserInfo();
    }
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>User Information for {username}</h2>
          <p>User ID: {user.userId}</p>
          <p>Profile: {user.profile}</p>
          <p>Username: {user.username}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ThreadCircle;
