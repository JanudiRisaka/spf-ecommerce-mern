import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function ping(_req: VercelRequest, res: VercelResponse) {
  // Return immediately — no imports, no DB, nothing async
  res.status(200).send('pong');
}
