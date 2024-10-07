// import { NextApiRequest, NextApiResponse } from 'next';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import options from '@/swagger'; // Your Swagger options file
// import { parse } from 'url';

// // Initialize Swagger spec
// const swaggerSpec = swaggerJsdoc(options);

// export default async function handler(
//    req: NextApiRequest,
//    res: NextApiResponse
// ) {
//    const { pathname } = parse(req.url || '', true);

//    if (pathname === '/api/docs') {
//       // Serve Swagger UI
//       return swaggerUi.setup(swaggerSpec)(req as Request, res, () => {});
//    } else {
//       // Handle cases where the route is not found
//       res.status(404).send('Not Found');
//    }
// }

// // Optional: Disable body parsing if needed
// export const config = {
//    api: {
//       bodyParser: false,
//    },
// };
