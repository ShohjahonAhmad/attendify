-- CreateTable
CREATE TABLE "students" (
    "users_id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "matriculation" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("users_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_matriculation_key" ON "students"("matriculation");
