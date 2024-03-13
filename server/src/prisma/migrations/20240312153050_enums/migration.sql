/*
  Warnings:

  - You are about to alter the column `category` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(3))`.
  - You are about to alter the column `tag` on the `Tags` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Categories` MODIFY `category` ENUM('all', 'spring', 'summer', 'autumn', 'winter', 'romantic', 'sympathy', 'congratulation', 'tropic', 'anniversary', 'bouquets', 'basket', 'vase') NOT NULL DEFAULT 'all';

-- AlterTable
ALTER TABLE `Tags` MODIFY `tag` ENUM('all', 'Roses', 'Lilies', 'Tulips', 'Sunflowers', 'Orchids', 'Peonies', 'Daisies', 'Hydrangeas', 'Carnations', 'Chrysanthemums', 'Gerberas', 'Freesia', 'Lavender', 'Gardenias', 'Ranunculus', 'Alstroemeria', 'Gladiolus', 'Marigolds', 'Violets', 'Poppies', 'Anemones', 'Irises', 'Daffodils', 'Magnolias', 'Jasmine', 'Lilacs', 'Snapdragons', 'Azaleas', 'Begonias', 'Camellias', 'Red', 'Yellow', 'Pink', 'White', 'Blue', 'Orange', 'Purple', 'Green', 'Black', 'Mixed_Colors', 'Fragrant', 'Non_Fragrant', 'Indoor', 'Outdoor', 'Seasonal', 'Year_Round', 'Exotic', 'Local', 'Sustainable', 'Eco_Friendly', 'Birthday', 'Wedding', 'Funeral', 'Get_Well', 'Im_Sorry', 'Thank_You', 'New_Baby', 'Mother_Day', 'Valentine_Day', 'Christmas', 'Easter', 'Halloween', 'Anniversary', 'Congratulations', 'Love_Romance', 'Sympathy_Funeral', 'Housewarming', 'Graduation', 'Retirement', 'Prom', 'DIY', 'Bouquets', 'Arrangements', 'Single_Stem', 'Potted', 'DriedFlowers', 'Artificial_Flower') NOT NULL DEFAULT 'all';
