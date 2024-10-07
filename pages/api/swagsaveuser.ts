// /**
//  * @swagger
//  * /api/saveUser:
//  *   post:
//  *     summary: Save a new user
//  *     description: Saves a new user to postgres database.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               firstname:
//  *                 type: string
//  *               lastname:
//  *                 type: string
//  *               age:
//  *                 type: integer
//  *               sex:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: User data saved
//  *       400:
//  *         description: Invalid data
//  *       500:
//  *         description: Error saving user
//  */
