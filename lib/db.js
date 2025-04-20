import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



async function  initDB() {

  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE  IF NOT EXISTS  \`TruckHits\` (
        \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'id',
        \`date\` date NOT NULL,
        \`linkto\` varchar(300) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);
    
    connection.release();
    console.log('Truck tables is ready');
  } catch(e){
    console.error("failed to initialize database")
  }

};

 async function query(sql, values) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}
export {
  query,pool,initDB
};