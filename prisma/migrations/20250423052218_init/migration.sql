-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_modaratorId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "modaratorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_modaratorId_fkey" FOREIGN KEY ("modaratorId") REFERENCES "Modarator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
