import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import CitaView from './views/CitaView';
import ConsultarCitaView from './views/ConsultarCitaView';

const citaRoutes: RouteObject[] = [
  {
    path: '/cita',
    element: createElement(CitaView),
  },
  {
    path: '/consultar-cita',
    element: createElement(ConsultarCitaView),
  },
];

export default citaRoutes;
