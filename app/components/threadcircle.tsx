// components/ThreadCircle.tsx
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Thread {
  threadId: string;
  // Add other properties based on the API response
}

interface ThreadCircleProps {
  username: string;
}

const ThreadCircle: React.FC<ThreadCircleProps> = ({ username }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserThreads = async () => {
      try {
        const response = await axios.get(`/rapidapi/users/threads?username=${username}`);
        setThreads(response.data.threads);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          setError(`Error: ${axiosError.message}, Status: ${axiosError.response?.status}`);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    fetchUserThreads();
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='text-white'>
      <h2>Thread Circle for {username}</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.threadId}>{thread.threadId}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadCircle;
