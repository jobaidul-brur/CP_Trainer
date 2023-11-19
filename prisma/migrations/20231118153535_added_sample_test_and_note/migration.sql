-- AlterTable
ALTER TABLE `problem` ADD COLUMN `note` LONGTEXT NULL,
    ADD COLUMN `sample_tests` LONGTEXT NULL,
    MODIFY `input_specification` LONGTEXT NULL,
    MODIFY `output_specification` LONGTEXT NULL;
