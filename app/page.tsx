// pages/index.tsx
import React, { useState } from 'react';
import ThreadCircle from '@/app/components/threadcircle';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  return (
    <div>
      <h1>Thread Circle Generator</h1>
      <label>
        Enter Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      {username && <ThreadCircle username={username} />}
    </div>
  );
};

export default Home;
