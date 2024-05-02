/*
  Warnings:

  - You are about to drop the column `deliveryDate` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `deliveryDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `deliveryDate`;
