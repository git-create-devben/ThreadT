// pages/api/userInfo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-fetch';

const userInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query as { username: string };

  try {
    const response = await fetch(`https://threads-by-instagram-fast.p.rapidapi.com/users/details?username=${username}`, {
      headers: {
        'X-RapidAPI-Key': '7dd1c7dee4mshcfec6817a02ae0cp191b12jsn491b5cf51ed9',
        'X-RapidAPI-Host': 'threads-by-instagram-fast.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data.user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default userInfoHandler;
