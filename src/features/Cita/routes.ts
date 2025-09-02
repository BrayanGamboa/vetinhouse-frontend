import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import CitaView from './views/CitaView';

const citaRoutes: RouteObject[] = [
  {
    path: '/cita',
    element: createElement(CitaView),
  },
];

export default citaRoutes;
