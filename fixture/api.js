module.exports = runApiServer;

function runApiServer(port) {
  port = port || 3001;
  var express = require('express')
  , session = require('express-session')
  , app = express()
  , state = {
    count: 0
  };

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  }));
  app.post('/api/login', (req, res) => {
    req.session.user = 'authenticated';
    req.session.save(() => {
      res.end();
    });
  });
  app.delete('/api/logout', (req, res) => {
    delete req.session.user;
    req.session.destroy(() => {
      res.status(204).end();
    });
  });
  app.get('/api/count', (req, res) => {
    res.json(state);
  });
  app.post('/api/vote', (req, res) => {
    if (req.session.user) {
      state.count += 1;
      res.json(state);
    } else {
      res.status(403).end();
    }
  });
  app.delete('/api/vote', (req, res) => {
    if (req.session.user) {
      state.count -= 1;
      res.json(state);
    } else {
      res.status(403).end();
    }
  });
  app.listen(port);
}
