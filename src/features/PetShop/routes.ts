import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import PetShopView from './views/PetShopView';

const petShopRoutes: RouteObject[] = [
  {
    path: '/petshop',
    element: createElement(PetShopView),
  },
];

export default petShopRoutes;
