/*
  Warnings:

  - Added the required column `credits` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "description" TEXT NOT NULL;
