/*
  Warnings:

  - You are about to drop the column `firstName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `matriculation` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unique_identifier]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unique_identifier` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."students_matriculation_key";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "matriculation",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "unique_identifier" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "curators" (
    "curator_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "unique_identifier" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curators_pkey" PRIMARY KEY ("curator_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "curatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" SERIAL NOT NULL,
    "qrCodeId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "QrCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "attendanceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttendanceToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AttendanceToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "curators_email_key" ON "curators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "curators_unique_identifier_key" ON "curators"("unique_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_qrCodeId_key" ON "Attendance"("qrCodeId");

-- CreateIndex
CREATE INDEX "_AttendanceToStudent_B_index" ON "_AttendanceToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "students_unique_identifier_key" ON "students"("unique_identifier");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "curators"("curator_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QrCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToStudent" ADD CONSTRAINT "_AttendanceToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("attendance_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToStudent" ADD CONSTRAINT "_AttendanceToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("users_id") ON DELETE CASCADE ON UPDATE CASCADE;
