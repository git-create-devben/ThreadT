// pages/api/userInfo.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { Response as FetchResponse } from 'isomorphic-fetch';

const userInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let apiResponse: FetchResponse;

  try {
    // Check if req.query and req.query.username are defined
    if (!req.query || !req.query.username) {
      throw new Error('Username is missing in the request.');
    }

    const { username } = req.query as { username: string };

    apiResponse = await fetch(`https://threads-by-instagram-fast.p.rapidapi.com/users/details?username=${username}`, {
      headers: {
        'X-RapidAPI-Key': '7dd1c7dee4mshcfec6817a02ae0cp191b12jsn491b5cf51ed9',
        'X-RapidAPI-Host': 'threads-by-instagram-fast.p.rapidapi.com',
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`Request failed with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    if (!data.user) {
      throw new Error('Invalid response format: Missing user data.');
    }

    res.status(200).json(data.user);
  } catch (error: any) {
    // Log the actual response received from the API
    console.error('API response:', await apiResponse?.text());

    // Check if error is defined and has a message property
    const errorMessage = error?.message || 'Internal Server Error';

    // Check if the res object is defined before setting the status
    if (res) {
      res.status(500).json({ error: errorMessage });
    } else {
      console.error('Response object is undefined.');
    }
  }
};

export default userInfoHandler;
