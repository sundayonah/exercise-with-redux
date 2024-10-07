import { NextApiRequest, NextApiResponse } from 'next';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/app/lib/swagger';
import { runMiddleware } from '@/app/lib/runMiddleware';
// import NextFunction from "next"
// Helper to manually run middleware (since Next.js API routes don't support Express middleware)
const swaggerServe = swaggerUi.serve;
const swaggerSetup = swaggerUi.setup(swaggerSpec);

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === 'GET') {
      // Loop over the swaggerServe middlewares (since it's an array)
      for (const middleware of swaggerServe) {
         await runMiddleware(req, res, middleware); // Run each middleware in sequence
      }

      // Serve the Swagger UI documentation
      swaggerSetup(req as never, res as never, () => {});
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
