// pages/api/threads/circle.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Thread = {
  id: string;
  title: string;
  posts: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

type ThreadCircle = {
  threads: Array<Thread>;
};

const threadsApi = axios.create({
  baseURL: 'https://rapidapi.com/omergulen/api/threads-by-instagram-fast/v1',
  headers: {
    'X-RapidAPI-Key': 'YOUR_API_KEY',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the IDs of the threads to include in the circle
  const threadIds = req.query.threadIds as string[] || [];

  // Fetch the threads from the API
  const threads = await Promise.all(
    threadIds.map(async (threadId) => {
      const threadResponse = await threadsApi.get(`/threads/${threadId}`);
      return threadResponse.data as Thread;
    })
  );

  // Create the thread circle object
  const threadCircle: ThreadCircle = {
    threads,
  };

  // Return the thread circle object to the client
  res.status(200).json(threadCircle);
}
