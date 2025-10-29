/*
  Warnings:

  - You are about to drop the column `qrCodeId` on the `Attendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attendanceId]` on the table `QrCode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendanceId` to the `QrCode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_qrCodeId_fkey";

-- DropIndex
DROP INDEX "public"."Attendance_qrCodeId_key";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "qrCodeId";

-- AlterTable
ALTER TABLE "QrCode" ADD COLUMN     "attendanceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_attendanceId_key" ON "QrCode"("attendanceId");

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance"("attendance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
