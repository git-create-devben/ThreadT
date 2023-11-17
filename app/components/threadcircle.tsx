// pages/threads/circle.tsx
import React from 'react';
import { useQuery } from 'react-query';
import ThreadCircle  from '@/app/api/page';
import { Card } from '@mantine/core';

const ThreadsCircle = () => {
  // Get the thread circle object from the API
  const { data: threadCircle } = useQuery('threadCircle', async () => {
    const response = await fetch('/api/threads/circle?threadIds=12345,67890');
    return await response.json();
  });

  if (!threadCircle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Thread Circle</h1>
      <div className="grid grid-cols-3 gap-4">
        {threadCircle.threads.map((thread) => (
          <Card key={thread.id}>
            <h2 className="card-title">{thread.title}</h2>
            <p className="card-body">{thread.posts[0].content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThreadsCircle;
