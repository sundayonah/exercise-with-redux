import { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response, NextFunction } from 'express';

// Define the type for middleware function
type MiddlewareFunction = (
   req: Request,
   res: Response,
   next: NextFunction
) => void;

// Helper function to run middleware in Next.js
export function runMiddleware(
   req: NextApiRequest,
   res: NextApiResponse,
   fn: MiddlewareFunction
): Promise<void> {
   return new Promise((resolve, reject) => {
      // Cast Next.js request and response to Express types
      fn(
         (req as unknown) as Request,
         (res as unknown) as Response,
         (result: unknown) => {
            if (result instanceof Error) {
               return reject(result);
            }
            return resolve();
         }
      );
   });
}
