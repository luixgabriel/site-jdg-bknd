import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const finishConnections = async (req: Request, res: Response, next: NextFunction) => {
  // Middleware que desconecta o Prisma após cada requisição
  console.log('cheguei primeiro')
  res.on('finish', async () => {
    if (!prisma.$disconnect) {
      throw new Error('Prisma client does not have disconnect method');
    }
    await prisma.$disconnect(); // Aguarda a desconexão do Prisma
  });
  console.log('cheguei aqui')
  next();
}