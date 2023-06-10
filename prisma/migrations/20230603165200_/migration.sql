/*
  Warnings:

  - The `courseStudents` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studentCourse` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseStudents",
ADD COLUMN     "courseStudents" TEXT[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentCourse",
ADD COLUMN     "studentCourse" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Student_slug_key" ON "Student"("slug");
