-- DropForeignKey
ALTER TABLE "public"."EmailTokens" DROP CONSTRAINT "EmailTokens_curatorId_fkey";

-- AddForeignKey
ALTER TABLE "EmailTokens" ADD CONSTRAINT "EmailTokens_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "curators"("curator_id") ON DELETE CASCADE ON UPDATE CASCADE;
