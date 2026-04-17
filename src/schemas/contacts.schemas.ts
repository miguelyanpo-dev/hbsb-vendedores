import { createRoute, z } from '@hono/zod-openapi';
import { ErrorResponse } from './response.schemas';

export const SellerContactSchema = z.object({
  id_contact: z.number(),
  contact_name: z.string().nullable(),
  contact_image: z.string().nullable(),
});

export const SellersResponseSchema = z.array(SellerContactSchema);

export const GetSellerContactsRoute = createRoute({
  method: 'get',
  path: '/contacts/sellers',
  tags: ['Contacts'],
  summary: 'List seller contacts',
  description: 'Returns only contacts flagged as sellers.',
  request: {
    query: z.object({
      ref: z.string().min(1).openapi({
        description: 'Supabase project reference used for DB connection',
        example: 'mfyskybetbwchtvfsbyi',
      }),
    }),
  },
  responses: {
    200: {
      description: 'Seller contacts list',
      content: {
        'application/json': {
          schema: SellersResponseSchema,
        },
      },
    },
    400: {
      description: 'Missing or invalid ref query parameter',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
    404: {
      description: 'Resource not found in current environment restrictions',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
  },
});
