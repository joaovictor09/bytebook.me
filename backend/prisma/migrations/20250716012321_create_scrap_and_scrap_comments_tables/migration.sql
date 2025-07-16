-- CreateTable
CREATE TABLE "scraps" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sender_id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,

    CONSTRAINT "scraps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scrap_comments" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sender_id" TEXT NOT NULL,
    "scrap_id" TEXT NOT NULL,

    CONSTRAINT "scrap_comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scraps" ADD CONSTRAINT "scraps_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scraps" ADD CONSTRAINT "scraps_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrap_comments" ADD CONSTRAINT "scrap_comments_scrap_id_fkey" FOREIGN KEY ("scrap_id") REFERENCES "scraps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scrap_comments" ADD CONSTRAINT "scrap_comments_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
