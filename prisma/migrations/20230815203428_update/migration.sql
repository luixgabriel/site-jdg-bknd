/*
  Warnings:

  - You are about to drop the column `CNPJ` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `CPF` on the `Client` table. All the data in the column will be lost.
  - Added the required column `github` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "CNPJ",
DROP COLUMN "CPF",
ADD COLUMN     "document" TEXT NOT NULL;
