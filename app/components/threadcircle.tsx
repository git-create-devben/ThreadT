// components/ThreadCircle.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Thread {
  threadId: string;
  // Add other properties based on the API response
}

interface ThreadCircleProps {
  username: string;
}

const ThreadCircle: React.FC<ThreadCircleProps> = ({ username }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchUserThreads = async () => {
      try {
        const response = await axios.get(`/rapidapi/users/threads?username=${username}`);
        setThreads(response.data.threads);
      } catch (error) {
        console.error('Error fetching user threads:', error);
      }
    };

    fetchUserThreads();
  },);

  return (
    <div>
      <h1>Thread Circle Generator</h1>
      <label>
        Enter Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      {username && username.trim() !== '' && <ThreadCircle username={username.startsWith('@') ? username : `@${username}`} />}
    </div>
  );
};

export default ThreadCircle;
