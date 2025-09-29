-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'client');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."Role";
