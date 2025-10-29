-- DropForeignKey
ALTER TABLE "public"."QrCode" DROP CONSTRAINT "QrCode_attendanceId_fkey";

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance"("attendance_id") ON DELETE CASCADE ON UPDATE CASCADE;
