-- CreateTable
CREATE TABLE "PhilosophyCard" (
    "id" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "categoryAr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PhilosophyCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutFeature" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "iconColor" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AboutFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSettings" (
    "id" TEXT NOT NULL,
    "terminalCodeEn" TEXT NOT NULL,
    "terminalCodeAr" TEXT NOT NULL,
    "projectTitleEn" TEXT NOT NULL,
    "projectTitleAr" TEXT NOT NULL,
    "projectDescEn" TEXT NOT NULL,
    "projectDescAr" TEXT NOT NULL,
    "projectTagsEn" TEXT[],
    "projectTagsAr" TEXT[],
    "projectLink" TEXT NOT NULL,

    CONSTRAINT "HeroSettings_pkey" PRIMARY KEY ("id")
);
