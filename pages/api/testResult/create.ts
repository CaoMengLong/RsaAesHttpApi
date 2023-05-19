import prisma from "../../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth';
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { testId } = req.body;
  const session = await getServerSession(req, res, authOptions)
  const email = session?.user?.email
  if (email) {
    await prisma.testResult.create({
      data: {
        userId: email,
        testId: Number(testId),
      },
    });
  }
  res.json("OK");
}