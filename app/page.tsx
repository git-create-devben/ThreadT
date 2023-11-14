// pages/index.tsx
"use client"
import React, { useState } from 'react';
import ThreadCircle from '@/app/components/threadcircle';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  return (
    <div text-black>
    <h1>Thread Circle Generator</h1>
    <label>
      Enter Username:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    {username && username.trim() !== '' && <ThreadCircle username={username.startsWith('@') ? username : `@${username}`} />}
  </div>
  );
};

export default Home;
