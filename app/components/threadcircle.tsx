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
  }, [username]);

  return (
    <div>
      <h2>Thread Circle for {username}</h2>
      {/* Your thread circle visualization goes here */}
      <ul>
        {threads.map((thread) => (
          <li key={thread.threadId}>{thread.threadId}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadCircle;
