-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CURATOR', 'STUDENT');

-- CreateTable
CREATE TABLE "students" (
    "users_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "unique_identifier" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "institution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("users_id")
);

-- CreateTable
CREATE TABLE "curators" (
    "curator_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "unique_identifier" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'CURATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "curators_pkey" PRIMARY KEY ("curator_id")
);

-- CreateTable
CREATE TABLE "EmailTokens" (
    "email_tokens_id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "curatorId" INTEGER NOT NULL,

    CONSTRAINT "EmailTokens_pkey" PRIMARY KEY ("email_tokens_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "courses_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "curatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("courses_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "attendance_id" SERIAL NOT NULL,
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
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_unique_identifier_key" ON "students"("unique_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "curators_email_key" ON "curators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "curators_unique_identifier_key" ON "curators"("unique_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "EmailTokens_token_key" ON "EmailTokens"("token");

-- CreateIndex
CREATE INDEX "EmailTokens_expires_idx" ON "EmailTokens"("expires");

-- CreateIndex
CREATE UNIQUE INDEX "Course_curatorId_name_key" ON "Course"("curatorId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_code_key" ON "QrCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_attendanceId_key" ON "QrCode"("attendanceId");

-- CreateIndex
CREATE INDEX "_AttendanceToStudent_B_index" ON "_AttendanceToStudent"("B");

-- AddForeignKey
ALTER TABLE "EmailTokens" ADD CONSTRAINT "EmailTokens_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "curators"("curator_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "curators"("curator_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("courses_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance"("attendance_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToStudent" ADD CONSTRAINT "_AttendanceToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("attendance_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToStudent" ADD CONSTRAINT "_AttendanceToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("users_id") ON DELETE CASCADE ON UPDATE CASCADE;
