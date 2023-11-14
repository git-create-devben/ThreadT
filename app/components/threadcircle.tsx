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
      <h1 className="text-2xl font-bold mb-4">Thread Circle Generator</h1>
      <label className="block mb-4">
        Enter Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded-md w-full text-black"
        />
      </label>
      <button onClick={handleFetchUser} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Fetch User Info
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {user && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">User Information for {username}</h2>
          {/* Display a circular profile picture */}
          <div
            className="w-20 h-20 rounded-full bg-gray-300 mb-2"
            style={{ backgroundImage: `url(${user.profile})`, backgroundSize: 'cover' }}
          ></div>
          <p className="mb-2">User ID: {user.userId}</p>
          <p className="mb-2">Profile: {user.profile}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default ThreadCircle;
