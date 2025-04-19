import { query,pool } from '../../lib/db';


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM TruckHits order by `date` desc;', []);
      res.status(200).json({ trucks: results });
      console.log(results)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Database error', error });
    } 
  } 


  
  if (req.method === 'POST') {
    // Insert data into MySQL
    const { datelink, link } = req.body;

    if (!datelink || !link) {
      res.status(400).json({ message: "Missing date or truck hit" });
    }

    try {
      const query = "INSERT INTO TruckHits (date, linkto) VALUES (?, ?)";
      const values = [datelink, link];

      await pool.query(query, values);
      res.status(200).json({ message: "Data added successfully" });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ message: "Failed to insert data" });
    }
  }
  // Fallback for unsupported methods
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);

}