/*
  Warnings:

  - The `status` column on the `JobOpportunity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "jobStatus" AS ENUM ('OPENED', 'RECRUITING', 'CLOSED');

-- AlterTable
ALTER TABLE "JobOpportunity" DROP COLUMN "status",
ADD COLUMN     "status" "jobStatus" NOT NULL DEFAULT 'OPENED';
