import { createElement } from 'react';
import RegisterView from './views/RegisterView';

export const registerRoutes = [
  {
    path: '/register',
    element: createElement(RegisterView)
  }
];