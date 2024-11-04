import { rest } from 'msw';
import exampleResponse from './mockData';

export const handlers = [
    rest.get('/api/incidents', (req, res, ctx) => {
      console.log('Intercepted /api/incidents request'); // Log to confirm interception
      const page = parseInt(req.url.searchParams.get('page'), 10) || 1;
      const incidentsPerPage = parseInt(req.url.searchParams.get('incidentsPerPage'), 10) || 5;
      const start = (page - 1) * incidentsPerPage;
      const paginatedIncidents = exampleResponse.incidents.slice(start, start + incidentsPerPage);
  
      return res(
        ctx.status(200),
        ctx.json({
          incidents: paginatedIncidents,
          total: exampleResponse.incidents.length,
        })
      );
    }),
  ];
