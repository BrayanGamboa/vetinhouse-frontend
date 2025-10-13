import type { RouteObject } from 'react-router';
import { createElement } from 'react';
import GPSView from './views/GPSView';

export const gpsRoutes: RouteObject[] = [
  {
    path: '/gps',
    element: createElement(GPSView),
  }
];
