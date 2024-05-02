/*
  Warnings:

  - Added the required column `deliveryDate` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `deliveryDate` DATETIME(3) NOT NULL;
