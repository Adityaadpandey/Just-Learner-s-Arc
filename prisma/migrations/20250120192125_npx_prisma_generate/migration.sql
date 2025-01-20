-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "Name" TEXT,
    "Email" TEXT NOT NULL,
    "Github" TEXT NOT NULL,
    "Linkedin" TEXT NOT NULL,
    "College" TEXT NOT NULL,
    "Course" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "Phone" TEXT NOT NULL,
    "VideoUrl" TEXT NOT NULL,
    "Discord" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Github_key" ON "User"("Github");

-- CreateIndex
CREATE UNIQUE INDEX "User_Linkedin_key" ON "User"("Linkedin");
