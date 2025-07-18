/*
  Warnings:

  - A unique constraint covering the columns `[wallet]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `photo_url` VARCHAR(191) NULL,
    ADD COLUMN `wallet` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_wallet_key` ON `User`(`wallet`);
