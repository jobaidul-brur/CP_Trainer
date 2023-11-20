-- AlterTable
ALTER TABLE `contest` ADD COLUMN `author` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Contest` ADD CONSTRAINT `Contest_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
