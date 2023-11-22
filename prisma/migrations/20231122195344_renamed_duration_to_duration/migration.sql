/*
  Warnings:

  - You are about to drop the column `Duration` on the `contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contest` DROP COLUMN `Duration`,
    ADD COLUMN `duration` INTEGER NULL;
