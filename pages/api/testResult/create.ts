import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'

import { getServerSession } from 'next-auth';
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { testId } = req.body;
  res.json("OK");
}