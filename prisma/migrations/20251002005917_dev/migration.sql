/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `refreshTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."refreshTokens" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "revokedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "refreshTokens_token_key" ON "public"."refreshTokens"("token");
