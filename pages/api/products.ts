import { NextApiRequest, NextApiResponse } from 'next';

const PRODUCTS_BASE_URL = 'https://6630c556c92f351c03db0209.mockapi.io/api/dzen/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request
    const response = await fetch(PRODUCTS_BASE_URL);
    const products = await response.json();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    try {
      const { body } = req;
      const response = await fetch(PRODUCTS_BASE_URL, {
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
  } else if (req.method === 'DELETE') {
    try {
      const { productId } = req.query;
      await fetch(`${PRODUCTS_BASE_URL}/${productId}`, {
        method: 'DELETE',
      });

      res.status(200).json({ productId });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
