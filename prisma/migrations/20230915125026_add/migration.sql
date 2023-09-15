/*
  Warnings:

  - Added the required column `category` to the `JobOpportunity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "applications" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "JobOpportunity" ADD COLUMN     "category" TEXT NOT NULL;
