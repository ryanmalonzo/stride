-- CreateTable
CREATE TABLE "Struggle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Struggle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Struggle_userId_idx" ON "Struggle"("userId");

-- AddForeignKey
ALTER TABLE "Struggle" ADD CONSTRAINT "Struggle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
