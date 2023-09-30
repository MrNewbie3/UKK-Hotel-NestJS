/*
  Warnings:

  - A unique constraint covering the columns `[auth_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_code" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_code_key" ON "User"("auth_code");
