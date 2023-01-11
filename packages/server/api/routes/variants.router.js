const express = require('express');

const router = express.Router({ mergeParams: true });

// controllers
const variantsController = require('../controllers/variants.controller');

/**
 * @swagger
 * /variants:
 *  get:
 *    tags:
 *    - variants
 *    summary: Get variants by productId and by color or by size
 *    description:
 *      Will return All variants with a matching productId.
 *    produces: application/json
 *    parameters:
 *     - in: query
 *       name: product_id
 *       schema:
 *         type: integer
 *         required: true
 *         description: The ID of the variants to get
 *     - in: query
 *       name: color
 *       schema:
 *         type: string
 *         required: false
 *         description: The color of the variants to get
 *     - in: query
 *       name: size
 *       schema:
 *         type: string
 *         required: false
 *         description: The size of the variants to get
 *    responses:
 *      200:
 *        description: Successful request
 *      5XX:
 *        description: Unexpected error.
 */

router.get('/', (req, res, next) => {
  variantsController
    .getVariantsProductByAtribute(req.query)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;
