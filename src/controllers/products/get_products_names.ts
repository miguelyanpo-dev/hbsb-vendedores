import { Context } from 'hono/dist/types/context';
import { KardexService } from '../../services/products.service';
import { getDb } from '../../config/db';

export const getProductsNames = async (c: Context) => {
  const ref = c.req.query('ref')?.trim();
  if (ref && process.env.NODE_ENV === 'production' && process.env.ENABLE_DB_REF !== 'true') {
    return c.json({ success: false, error: 'Not Found' }, 404);
  }
  const db = getDb(ref);

  const { rows } = await db.query(
    `
    SELECT code, name, combine_names
    FROM products
    WHERE deleted_at IS NULL
    ORDER BY code
    `
  );

  return c.json({
    success: true,
    data: rows
  }, 200);
};