import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BASEHUB_TOKEN: z.string().min(1).startsWith('bshb_pk_'),
    RESEND_AUDIENCE_ID: z.string().min(1),
    RESEND_TOKEN: z.string().min(1).startsWith('re_'),
  },
  client: {},
  runtimeEnv: {
    BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
  },
});