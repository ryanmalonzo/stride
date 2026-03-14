-- CreateEnum
CREATE TYPE "HabitType" AS ENUM ('IMPLEMENTATION_INTENTION', 'HABIT_STACK');

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "HabitType" NOT NULL,
    "name" TEXT NOT NULL,
    "tinyVersion" TEXT NOT NULL,
    "time" TEXT,
    "location" TEXT,
    "anchor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Habit_userId_idx" ON "Habit"("userId");

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
