/*
  Warnings:

  - Added the required column `icon` to the `Cuisine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuisine" ADD COLUMN     "icon" TEXT NOT NULL;
