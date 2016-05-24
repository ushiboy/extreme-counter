import { dispatch } from './backend-app';
import connect from 'connect';
import http from 'http';

export function createServer() {
  const app = connect();

  app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    dispatch(req).then(({ html, status }) => {
      res.end(html, status);
    }).catch(err => {
      console.log(err);
      res.end('Internal Server Error', 500);
    });
  });
  return http.createServer(app);
}
