<<<<<<< HEAD
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Modarator');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('NEGOTIABLE', 'RANGE', 'FIXED');

-- CreateTable
CREATE TABLE "Modarator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Modarator',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Modarator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modaratorId" INTEGER NOT NULL,
    "title" TEXT,
    "companyName" TEXT,
    "vacancy" INTEGER NOT NULL DEFAULT 1,
    "salaryType" "SalaryType" NOT NULL DEFAULT 'NEGOTIABLE',
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "fixedSalary" DOUBLE PRECISION,
    "location" TEXT NOT NULL,
    "jobType" "JobType",
    "experience" TEXT NOT NULL,
    "education" TEXT,
    "additionalRequirements" TEXT,
    "responsibilities" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "lunch" TEXT,
    "salaryReview" TEXT,
    "otherBenefits" TEXT,
    "companyInfo" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
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

-- CreateIndex
CREATE INDEX "Job_isActive_idx" ON "Job"("isActive");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_modaratorId_fkey" FOREIGN KEY ("modaratorId") REFERENCES "Modarator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
=======
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Modarator');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('NEGOTIABLE', 'RANGE', 'FIXED');

-- CreateTable
CREATE TABLE "Modarator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Modarator',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Modarator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modaratorId" INTEGER NOT NULL,
    "title" TEXT,
    "companyName" TEXT,
    "vacancy" INTEGER NOT NULL DEFAULT 1,
    "salaryType" "SalaryType" NOT NULL DEFAULT 'NEGOTIABLE',
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "fixedSalary" DOUBLE PRECISION,
    "location" TEXT NOT NULL,
    "jobType" "JobType",
    "experience" TEXT NOT NULL,
    "education" TEXT,
    "additionalRequirements" TEXT,
    "responsibilities" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "lunch" TEXT,
    "salaryReview" TEXT,
    "otherBenefits" TEXT,
    "companyInfo" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
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

-- CreateIndex
CREATE INDEX "Job_isActive_idx" ON "Job"("isActive");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_modaratorId_fkey" FOREIGN KEY ("modaratorId") REFERENCES "Modarator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
>>>>>>> origin/main
