-- CreateTable
CREATE TABLE `_ContestProblems` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ContestProblems_AB_unique`(`A`, `B`),
    INDEX `_ContestProblems_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ContestProblems` ADD CONSTRAINT `_ContestProblems_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContestProblems` ADD CONSTRAINT `_ContestProblems_B_fkey` FOREIGN KEY (`B`) REFERENCES `Problem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
