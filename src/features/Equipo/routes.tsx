import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import EquipoView from './views/EquipoView';

export const equipoRoutes: RouteObject[] = [
  {
    path: '/equipo',
    element: createElement(EquipoView),
  }
];
