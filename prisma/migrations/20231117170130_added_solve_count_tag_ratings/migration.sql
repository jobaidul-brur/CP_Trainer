-- AlterTable
ALTER TABLE `problem` ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `solvedCount` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `problemId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_problemId_fkey` FOREIGN KEY (`problemId`) REFERENCES `Problem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
