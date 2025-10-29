/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `QrCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QrCode_code_key" ON "QrCode"("code");
