const express = require('express');

const router = express.Router({ mergeParams: true });

const usersController = require('../controllers/users.controllers');

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *    - users
 *    summary: Get all users
 *    description:
 *      Will return all users.
 *    produces: application/json
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */
router.get('/', (req, res, next) => {
  usersController
    .getUsers()
    .then((result) => res.json(result))
    .catch(next);
});

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *    - users
 *    summary: Create a user
 *    description:
 *      Will create a favorite.
 *    produces: application/json
 *    parameters:
 *      - in: body
 *        name: users
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *            - full_name
 *            - email
 *            - created_at
 *            - uid
 *          properties:
 *            full_name:
 *              type: string
 *            email:
 *              type: string
 *            created_at:
 *              type: date/time
 *            uid:
 *              type: date/time
 *    responses:
 *      201:
 *        description: User created
 *      5XX:
 *        description: Unexpected error.
 */
router.post('/', (req, res, next) => {
  usersController
    .createUsers(req.body)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
