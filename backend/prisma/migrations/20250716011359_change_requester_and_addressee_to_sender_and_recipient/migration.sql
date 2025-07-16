/*
  Warnings:

  - You are about to drop the column `addressee_id` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `requester_id` on the `connections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sender_id,recipient_id]` on the table `connections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipient_id` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_addressee_id_fkey";

-- DropForeignKey
ALTER TABLE "connections" DROP CONSTRAINT "connections_requester_id_fkey";

-- DropIndex
DROP INDEX "connections_requester_id_addressee_id_key";

-- AlterTable
ALTER TABLE "connections" DROP COLUMN "addressee_id",
DROP COLUMN "requester_id",
ADD COLUMN     "recipient_id" TEXT NOT NULL,
ADD COLUMN     "sender_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "connections_sender_id_recipient_id_key" ON "connections"("sender_id", "recipient_id");

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
