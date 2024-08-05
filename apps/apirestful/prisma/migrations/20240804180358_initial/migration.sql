/*
  Warnings:

  - You are about to drop the column `breedId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the `Breed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `breed` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_breedId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "breedId",
ADD COLUMN     "breed" TEXT NOT NULL;

-- DropTable
DROP TABLE "Breed";
