import type { OpenAPIHono } from '@hono/zod-openapi';
import { GetSellerContactsRoute } from '../schemas/contacts.schemas';
import { resolveDb } from '../utils/request.utils';
import { getSellerContacts } from '../services/contacts.service';

export const registerContactsRoutes = (apiV1: OpenAPIHono) => {
  apiV1.openapi(GetSellerContactsRoute as any, async (c) => {
    const resolved = resolveDb(c);
    if (resolved.kind === 'error') {
      return c.json(resolved.body, resolved.status);
    }

    const sellers = await getSellerContacts(resolved.db);
    return c.json(sellers, 200);
  });
};
