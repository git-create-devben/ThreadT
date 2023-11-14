// components/ThreadCircle.tsx
import React, { useState } from 'react';

interface User {
  userId: string;
  profile: string;
  username: string;
}

interface ThreadCircleProps {}

const ThreadCircle: React.FC<ThreadCircleProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`https://threads-by-instagram-fast.p.rapidapi.com/users/id?username=${username}`, {
        headers: {
          'X-RapidAPI-Key': '7dd1c7dee4mshcfec6817a02ae0cp191b12jsn491b5cf51ed9',
          'X-RapidAPI-Host': 'threads-by-instagram-fast.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleFetchUser = () => {
    if (username && username.trim() !== '') {
      fetchUserInfo();
    }
  };

  return (
    <div>
      <h1>Thread Circle Generator</h1>
      <label>
        Enter Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text-white'/>
      </label>
      <button onClick={handleFetchUser}>Fetch User Info</button>

      {error && <div>{error}</div>}
      {user && (
        <div>
          <h2>User Information for {username}</h2>
          <p>User ID: {user.userId}</p>
          <p>Profile: {user.profile}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default ThreadCircle;
