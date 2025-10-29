/*
  Warnings:

  - A unique constraint covering the columns `[curatorId,name]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_curatorId_name_key" ON "Course"("curatorId", "name");
