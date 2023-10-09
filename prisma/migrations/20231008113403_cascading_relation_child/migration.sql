-- DropForeignKey
ALTER TABLE "Kamar" DROP CONSTRAINT "Kamar_id_tipe_kamar_fkey";

-- AddForeignKey
ALTER TABLE "Kamar" ADD CONSTRAINT "Kamar_id_tipe_kamar_fkey" FOREIGN KEY ("id_tipe_kamar") REFERENCES "Tipe_Kamar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
