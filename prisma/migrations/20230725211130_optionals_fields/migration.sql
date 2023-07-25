-- AlterTable
ALTER TABLE "User" ALTER COLUMN "authenticated" SET DEFAULT false,
ALTER COLUMN "authenticationCode" DROP NOT NULL,
ALTER COLUMN "authenticationCodeCreatedAt" DROP NOT NULL;
