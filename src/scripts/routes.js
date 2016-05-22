import { route } from 'redux-routing';
import Index from './pages/Index';
import About from './pages/About';

const routes = [
  route('/', Index),
  route('/about', About)
];

export default routes;
