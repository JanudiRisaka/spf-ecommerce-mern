import type { VercelRequest, VercelResponse } from '@vercel/node';
export default function dbstatus(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ state: 'n/a' });
}
