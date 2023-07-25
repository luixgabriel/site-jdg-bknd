/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `authenticated` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authenticationCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authenticationCodeCreatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "authenticated" BOOLEAN NOT NULL,
ADD COLUMN     "authenticationCode" INTEGER NOT NULL,
ADD COLUMN     "authenticationCodeCreatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "stack" TEXT[];
