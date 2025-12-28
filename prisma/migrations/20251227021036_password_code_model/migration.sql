-- CreateTable
CREATE TABLE "PasswordCode" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordCode_code_key" ON "PasswordCode"("code");

-- AddForeignKey
ALTER TABLE "PasswordCode" ADD CONSTRAINT "PasswordCode_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("users_id") ON DELETE CASCADE ON UPDATE CASCADE;
