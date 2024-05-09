import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

import { SECRET } from '@/constants';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
      const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', cookie.serialize('token', token, { maxAge: 3600, path: '/' }));

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
