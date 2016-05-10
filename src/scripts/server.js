import { index } from './backend-app';
import connect from 'connect';
import http from 'http';

export function runServer(port=3002) {
  const app = connect();

  app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    index().then(html => {
      res.end(html);
    }).catch(err => {
      console.log(err);
      res.end('Internal Server Error', 500);
    });
  });
  http.createServer(app).listen(port);
}
