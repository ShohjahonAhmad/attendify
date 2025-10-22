/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
DROP COLUMN "id",
ADD COLUMN     "courses_id" SERIAL NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("courses_id");

-- CreateTable
CREATE TABLE "EmailTokens" (
    "email_tokens_id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "curatorId" INTEGER NOT NULL,

    CONSTRAINT "EmailTokens_pkey" PRIMARY KEY ("email_tokens_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailTokens_token_key" ON "EmailTokens"("token");

-- CreateIndex
CREATE INDEX "EmailTokens_expires_idx" ON "EmailTokens"("expires");

-- AddForeignKey
ALTER TABLE "EmailTokens" ADD CONSTRAINT "EmailTokens_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "curators"("curator_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courses_id") ON DELETE RESTRICT ON UPDATE CASCADE;
