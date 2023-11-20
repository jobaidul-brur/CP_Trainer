/*
  Warnings:

  - You are about to drop the column `author` on the `contest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `contest` DROP FOREIGN KEY `Contest_author_fkey`;

-- AlterTable
ALTER TABLE `contest` DROP COLUMN `author`,
    ADD COLUMN `authorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Contest` ADD CONSTRAINT `Contest_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
