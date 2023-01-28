import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { unauthorizedError } from "@/error";
import { prisma } from "@/config";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });

    if (!session) return generateUnauthorizedResponse(res);

    req.userId = session.id;

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  }
}

export function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & {userId: number};
