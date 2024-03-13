/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tagName` on the `Tags` table. All the data in the column will be lost.
  - Added the required column `tag` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `category`;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `tagName`,
    ADD COLUMN `tag` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `category` ENUM('ALL', 'SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'ROMANTIC', 'SYMPATHY', 'CONGRATULATION', 'TROPIC', 'ANNIVERSARY', 'BOUQUETS', 'BASKET', 'VASE') NOT NULL DEFAULT 'ALL',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
