import { NextApiRequest, NextApiResponse } from 'next';

const ORDERS_BASE_URL = 'https://6630c556c92f351c03db0209.mockapi.io/api/dzen/orders';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch(ORDERS_BASE_URL);
    const orders = await response.json();
    res.status(200).json(orders);
  } else if (req.method === 'POST') {
    try {
      const { body } = req;
      const response = await fetch(ORDERS_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { orderId } = req.query;
      const { body } = req;
      const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { orderId } = req.query;
      await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
        method: 'DELETE',
      });

      res.status(200).json({ orderId });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
