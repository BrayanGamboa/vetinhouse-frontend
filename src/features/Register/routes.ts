import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import RegisterView from './views/RegisterView';

const registerRoutes: RouteObject[] = [
  {
    path: '/register',
    element: createElement(RegisterView),
  },
];

export default registerRoutes;
