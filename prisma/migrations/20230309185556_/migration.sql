/*
  Warnings:

  - Added the required column `by` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "by" TEXT NOT NULL;
