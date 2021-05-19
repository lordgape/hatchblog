// Import routes
const postsRoute = require('./api/postsRoute');

module.exports = function (app) {
  app.use('/api/posts', postsRoute);

  app.use('/api/ping', (req, res) => {
    res.json({ success: true });
  });

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
