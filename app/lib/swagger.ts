// // src/lib/swagger.ts
// import swaggerJsdoc from 'swagger-jsdoc';
// import { SwaggerDefinition, Options } from 'swagger-jsdoc';

// const swaggerDefinition: SwaggerDefinition = {
//    openapi: '3.0.0',
//    info: {
//       title: 'Next.js API with Swagger',
//       version: '1.0.0',
//       description: 'API documentation for Next.js project',
//    },
//    servers: [
//       {
//          url: 'http://localhost:3000/api/docs', // URL of your running Next.js server
//       },
//    ],
// };

// const options: Options = {
//    swaggerDefinition,
//    apis: ['../../app/**/*.ts'], // Path to the API docs
// };

// const swaggerSpec = swaggerJsdoc(options);
// export default swaggerSpec;

import { Options as SwaggerOptions } from 'swagger-jsdoc';

const swaggerDefinition = {
   openapi: '3.0.0',
   info: {
      title: 'User API Documentation',
      version: '1.0.0',
      description: 'API documentation for fetching and saving users',
   },
   servers: [
      {
         url: 'http://localhost:3000/api/docs',
      },
   ],
   components: {
      schemas: {
         User: {
            type: 'object',
            properties: {
               id: {
                  type: 'integer',
                  description: 'The user ID',
               },
               firstname: {
                  type: 'string',
                  description: "The user's first name",
               },
               lastname: {
                  type: 'string',
                  description: "The user's last name",
               },
               sex: {
                  type: 'string',
                  description: "The user's gender",
               },
               age: {
                  type: 'integer',
                  description: "The user's age",
               },
            },
         },
      },
   },
};

const options: SwaggerOptions = {
   definition: swaggerDefinition,
   apis: ['./pages/api/*.ts'], // Paths to files with API annotations
};

export default options;
