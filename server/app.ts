import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { expensesRoutes } from './routes/expenses';

const app = new Hono();

app.use(logger());

app.route('/api/expenses', expensesRoutes);

app.use('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
