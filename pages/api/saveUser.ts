// import { saveUser } from '@/actionns/actions';
// import { NextApiRequest, NextApiResponse } from 'next';
// // import { Client } from 'pg';

// // /**
// //  * @swagger
// //  * /saveUser:
// //  *   post:
// //  *     summary: Save a new user
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           schema:
// //  *             type: object
// //  *             properties:
// //  *               firstname:
// //  *                 type: string
// //  *               lastname:
// //  *                 type: string
// //  *               sex:
// //  *                 type: string
// //  *               age:
// //  *                 type: integer
// //  *     responses:
// //  *       201:
// //  *         description: User created successfully
// //  *       400:
// //  *         description: Bad Request - Missing fields
// //  *       500:
// //  *         description: Internal Server Error
// //  */

// // async function saveUserToDatabase(
// //    firstname: string,
// //    lastname: string,
// //    sex: string,
// //    age: number
// // ) {
// //    const client = new Client({
// //       user: 'postgres',
// //       host: 'localhost',
// //       database: 'users',
// //       password: 'Encoded.001',
// //       port: 5432,
// //    });

// //    await client.connect();

// //    // Use parameterized query to prevent SQL injection
// //    const query =
// //       'INSERT INTO users (firstname, lastname, sex, age) VALUES ($1, $2, $3, $4)';
// //    const values = [firstname, lastname, sex, age];

// //    await client.query(query, values);
// //    await client.end();
// // }

// // export default async function Post(req: NextApiRequest, res: NextApiResponse) {
// //    // Set CORS headers
// //    res.setHeader(
// //       'Access-Control-Allow-Methods',
// //       'GET, POST, PUT, DELETE, OPTIONS'
// //    );
// //    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

// //    if (req.method === 'POST') {
// //       try {
// //          const { firstname, lastname, sex, age } = req.body;

// //          if (!firstname || !lastname || !sex || !age) {
// //             return res.status(400).json({ message: 'Missing required fields' });
// //          }

// //          await saveUserToDatabase(firstname, lastname, sex, age);

// //          res.status(201).json({ message: 'User data saved' });
// //       } catch (error) {
// //          console.error('Error:', error);
// //          res.status(500).json({ message: 'Internal Server Error' });
// //       }
// //    } else {
// //       res.setHeader('Allow', ['POST']);
// //       res.status(405).end(`Method ${req.method} Not Allowed`);
// //    }
// // }

// export default async function Post(req: NextApiRequest, res: NextApiResponse) {
//    // Set CORS headers
//    res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, PUT, DELETE, OPTIONS'
//    );
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//    if (req.method === 'POST') {
//       try {
//          const { firstname, lastname, sex, age } = req.body;

//          if (!firstname || !lastname || !sex || !age) {
//             return res.status(400).json({ message: 'Missing required fields' });
//          }

//          console.log({ firstname, lastname, sex, age });

//          // Use Prisma-based saveUser action to save data to PostgreSQL
//          await saveUser({ firstname, lastname, sex, age });

//          res.status(201).json({ message: 'User data saved' });
//       } catch (error) {
//          console.error('Error:', error);
//          res.status(500).json({ message: 'Internal Server Error' });
//       }
//    } else {
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//    }
// }

// src/pages/api/saveUser.ts
import { saveUser } from '@/actions/actions';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * @swagger
 * /api/saveUser:
 *   post:
 *     summary: Save user data to database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               sex:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User data saved
 *       400:
 *         description: Invalid input
 */
export default async function post(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      try {
         await saveUser(req.body);
         res.status(200).json({ message: 'User saved' });
      } catch (error) {
         console.error('Error saving user:', error);
         res.status(400).json({ error: 'Invalid input' });
      }
   } else {
      res.status(405).json({ error: `Method ${req.method} not allowed` });
   }
}
