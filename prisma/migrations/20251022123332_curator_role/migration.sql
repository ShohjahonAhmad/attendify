-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CURATOR', 'STUDENT');

-- AlterTable
ALTER TABLE "curators" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CURATOR';
