-- AlterTable
ALTER TABLE `problem` ADD COLUMN `input_specification` VARCHAR(191) NULL,
    ADD COLUMN `output_specification` VARCHAR(191) NULL,
    ADD COLUMN `problem_statement` VARCHAR(191) NULL;
