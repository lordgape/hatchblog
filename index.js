const express = require('express');
const app = express();

require('./middlewares')(app);

// Setup route
const route = require('./routes/route');
route(app);

//Set up port
const PORT = global.process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening to request on  ${PORT}`);
});
