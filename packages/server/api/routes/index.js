const express = require('express');

const router = express.Router();

const exampleResources = require('./exampleResources.router');
const products = require('./products.router');
const categories = require('./categories.router');
const reviews = require('./reviews.router');
const favorites = require('./favorites.router');
const variants = require('./variants.router');
const users = require('./users.router');
const orders = require('./orders.router');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0',
      title: 'Final project',
      description: 'API documentation for the final project',
      contact: {},
    },
    host: '',
    basePath: '/api',
  },
  securityDefinitions: {},
  apis: ['./api/routes/*.js'],
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);

// Route for Swagger API Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/exampleResources', exampleResources);
router.use('/products', products);
router.use('/categories', categories);
router.use('/reviews', reviews);
router.use('/favorites', favorites);
router.use('/variants', variants);
router.use('/users', users);
router.use('/orders', orders);

module.exports = router;
