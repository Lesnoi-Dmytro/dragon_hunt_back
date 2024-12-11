/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EntityInfo" DROP CONSTRAINT "EntityInfo_imageId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "EntityImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "EntityImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EntityInfo" ADD CONSTRAINT "EntityInfo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "EntityImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
