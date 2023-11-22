/*
  Warnings:

  - You are about to drop the column `endTime` on the `contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contest` DROP COLUMN `endTime`,
    ADD COLUMN `Duration` INTEGER NULL;
