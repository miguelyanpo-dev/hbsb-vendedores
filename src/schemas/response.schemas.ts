import { z } from '@hono/zod-openapi';

// Schema para la respuesta exitosa
export const SuccessResponse = z.object({
  success: z.boolean(),
  data: z.any(),
});

// Schema para la respuesta de error
export const ErrorResponse = z.object({
  success: z.boolean(),
  error: z.string(),
  message: z.string().optional(),
});
