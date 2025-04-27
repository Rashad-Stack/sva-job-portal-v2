-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODARATOR');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "JobLevel" AS ENUM ('ENTRY_LEVEL', 'MID_LEVEL', 'ADVANCED_LEVEL');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MERN', 'FRONT_END', 'BACK_END', 'UI_UX', 'FULL_STACK', 'LARAVEL', 'DJANGO');

-- CreateEnum
CREATE TYPE "JobNature" AS ENUM ('ONSITE', 'REMOTE');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('DAY', 'NIGHT', 'EVENING');

-- CreateTable
CREATE TABLE "Modarator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MODARATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Modarator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modaratorId" INTEGER,
    "title" TEXT NOT NULL,
    "companyName" TEXT NOT NULL DEFAULT 'Softvence Agency',
    "numberOfHiring" INTEGER NOT NULL DEFAULT 1,
    "appliedBy" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "jobLevel" "JobLevel" NOT NULL,
    "category" "Category" NOT NULL,
    "jobNature" "JobNature" NOT NULL,
    "shift" "Shift" NOT NULL,
    "googleForm" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modarator_email_key" ON "Modarator"("email");

-- CreateIndex
CREATE INDEX "Job_jobType_idx" ON "Job"("jobType");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_modaratorId_fkey" FOREIGN KEY ("modaratorId") REFERENCES "Modarator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
