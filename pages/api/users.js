import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM TruckHits order by `date` desc;', []);
      res.status(200).json({ users: results });
      console.log(results)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}