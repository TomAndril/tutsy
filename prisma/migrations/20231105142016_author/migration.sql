/*
  Warnings:

  - Added the required column `author` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "author" TEXT NOT NULL;
