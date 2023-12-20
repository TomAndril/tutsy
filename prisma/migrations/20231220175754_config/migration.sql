/*
  Warnings:

  - A unique constraint covering the columns `[youtubeId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `chapter` ADD COLUMN `completedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `config` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `jumpToLastChapter` BOOLEAN NOT NULL DEFAULT true,

    INDEX `config_userId_idx`(`userId`),
    UNIQUE INDEX `config_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Video_youtubeId_key` ON `Video`(`youtubeId`);
