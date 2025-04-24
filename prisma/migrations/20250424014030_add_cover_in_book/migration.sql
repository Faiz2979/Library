/*
  Warnings:

  - Added the required column `cover` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `cover` VARCHAR(191) NOT NULL;
