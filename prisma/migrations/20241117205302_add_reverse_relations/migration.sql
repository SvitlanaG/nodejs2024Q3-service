/*
  Warnings:

  - You are about to drop the column `albums` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `tracks` on the `favorites` table. All the data in the column will be lost.
  - Changed the type of `createdAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "albums",
DROP COLUMN "artists",
DROP COLUMN "tracks";

-- CreateTable
CREATE TABLE "_FavoritesArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesArtists_AB_unique" ON "_FavoritesArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesArtists_B_index" ON "_FavoritesArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesAlbums_AB_unique" ON "_FavoritesAlbums"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesAlbums_B_index" ON "_FavoritesAlbums"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesTracks_AB_unique" ON "_FavoritesTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesTracks_B_index" ON "_FavoritesTracks"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesArtists" ADD CONSTRAINT "_FavoritesArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesArtists" ADD CONSTRAINT "_FavoritesArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesAlbums" ADD CONSTRAINT "_FavoritesAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesAlbums" ADD CONSTRAINT "_FavoritesAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTracks" ADD CONSTRAINT "_FavoritesTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTracks" ADD CONSTRAINT "_FavoritesTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
