// components/ThreadCircle.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface User {
  userId: string;
  profile: string;
  username: string;
  profile_pic_url: string;
}

interface ThreadCircleProps {}

const ThreadCircle: React.FC<ThreadCircleProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`/api?username=${username}`);

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
          {/* Display a circular profile picture using next/image */}
          <div className="relative w-20 h-20 mb-2">
            <Image src={user.profile_pic_url} alt={user.username} layout="fill" objectFit="cover" className="rounded-full" />
          </div>
          <p className="mb-2">User ID: {user.userId}</p>
          <p className="mb-2">Profile: {user.profile}</p>
          <p>Username: {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default ThreadCircle;
