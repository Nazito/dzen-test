import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

import { SECRET } from '@/constants';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '');

    const token = cookies['token'];

    if (token) {
      const user = jwt.verify(token, SECRET);
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
