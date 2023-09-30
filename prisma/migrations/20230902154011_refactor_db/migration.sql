-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'RESEPSIONIS', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BARU', 'CHECK_IN', 'CHECK_OUT');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pemesanan" (
    "id" SERIAL NOT NULL,
    "nomor" INTEGER NOT NULL,
    "nama_pemesan" TEXT NOT NULL,
    "email_pemesan" TEXT NOT NULL,
    "tgl_pemesanan" TIMESTAMP(3) NOT NULL,
    "tgl_check_in" TIMESTAMP(3) NOT NULL,
    "tgl_check_out" TIMESTAMP(3) NOT NULL,
    "nama_tamu" TEXT NOT NULL,
    "jumlah_kamar" INTEGER NOT NULL,
    "id_tipe_kamar" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "id_kamar" INTEGER,

    CONSTRAINT "Pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail_Pemesanan" (
    "id" SERIAL NOT NULL,
    "id_pemesanan" INTEGER NOT NULL,
    "id_kamar" INTEGER NOT NULL,
    "tgl_akses" TIMESTAMP(3) NOT NULL,
    "harga" INTEGER NOT NULL,

    CONSTRAINT "Detail_Pemesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kamar" (
    "id" SERIAL NOT NULL,
    "nomor" INTEGER NOT NULL,
    "id_tipe_kamar" INTEGER NOT NULL,

    CONSTRAINT "Kamar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipe_Kamar" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "Tipe_Kamar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nama_key" ON "User"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Kamar_nomor_key" ON "Kamar"("nomor");

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_id_tipe_kamar_fkey" FOREIGN KEY ("id_tipe_kamar") REFERENCES "Tipe_Kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_id_kamar_fkey" FOREIGN KEY ("id_kamar") REFERENCES "Kamar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Pemesanan" ADD CONSTRAINT "Detail_Pemesanan_id_kamar_fkey" FOREIGN KEY ("id_kamar") REFERENCES "Kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail_Pemesanan" ADD CONSTRAINT "Detail_Pemesanan_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "Pemesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kamar" ADD CONSTRAINT "Kamar_id_tipe_kamar_fkey" FOREIGN KEY ("id_tipe_kamar") REFERENCES "Tipe_Kamar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
