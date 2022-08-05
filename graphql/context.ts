import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";
import { Claims, getSession } from "@auth0/nextjs-auth0";

export type Context = {
  prisma: PrismaClient;
  user?: Claims;
  accessToken?: String;
};

export async function createContext({ req, res }: any): Promise<Context> {
  const session = getSession(req, res);

  if (!session) return { prisma };

  const { user, accessToken } = session;

  return {
    user,
    prisma,
    accessToken,
  };
}
