import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

const createPostSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: 'Groceries',
    amount: 50,
  },
  {
    id: 2,
    title: 'Utilities',
    amount: 100,
  },
  {
    id: 3,
    title: 'Rent',
    amount: 1200,
  },
];

export const expensesRoutes = new Hono()

  .get('/', async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post('/', zValidator('json', createPostSchema), async (c) => {
    const expense = await c.req.valid('json');
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })
  .get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
