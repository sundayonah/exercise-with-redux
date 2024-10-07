import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

// /**
//  * @swagger
//  * /getUsers:
//  *   get:
//  *     summary: Retrieve a list of users
//  *     responses:
//  *       200:
//  *         description: A list of users
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/User'
//  *       500:
//  *         description: Internal Server Error
//  */

async function fetchUsersFromDatabase(limit: number, offset: number) {
   const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'users',
      password: 'Encoded.001',
      port: 5432,
   });

   await client.connect();

   const res = await client.query('SELECT * FROM users LIMIT $1 OFFSET $2', [
      limit,
      offset,
   ]);
   await client.end();

   return res.rows;
}

export default async function getUsers(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === 'GET') {
      try {
         const limit = parseInt(req.query.limit as string) || 100;
         const offset = parseInt(req.query.offset as string) || 0;

         const users = await fetchUsersFromDatabase(limit, offset);
         console.log(users, 'users////////');

         res.status(200).json(users);
      } catch (error) {
         console.error('Error fetching users:', error);
         res.status(500).json({ message: 'Internal Server Error' });
      }
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }

   res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
   );
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
