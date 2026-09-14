-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SkillCategory" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
