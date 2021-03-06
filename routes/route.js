const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const postsRoute = require('./api/postsRoute');

module.exports = function (app) {
  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: 'HatchBlog API',
        version: '1.0'
      }
    },
    // eslint-disable-next-line no-undef
    apis: [__filename]
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api/posts', postsRoute);

  app.use('/api/ping', (req, res) => {
    res.json({ success: true });
  });

  /**
   * @swagger
   * /:
   *   get:
   *     description: Health Server Check
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success message if server is in good health
   *       404:
   *         description: Not Found
   */
  app.use(function (req, res) {
    if (req.url == '/') {
      res.json({ code: 'SUCCESS', response: 'hatchblog server is in good health', error: '' });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.json({ code: 'Not_found', response: '', error: 'Resource not found' });
      return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
  });
};
