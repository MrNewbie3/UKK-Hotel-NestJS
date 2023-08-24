-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'RESEPSIONIS', 'USER') NOT NULL,

    UNIQUE INDEX `User_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor` INTEGER NOT NULL,
    `nama_pemesan` VARCHAR(191) NOT NULL,
    `email_pemesan` VARCHAR(191) NOT NULL,
    `tgl_pemesanan` DATETIME(3) NOT NULL,
    `tgl_check_in` DATETIME(3) NOT NULL,
    `tgl_check_out` DATETIME(3) NOT NULL,
    `nama_tamu` VARCHAR(191) NOT NULL,
    `jumlah_kamar` INTEGER NOT NULL,
    `id_tipe_kamar` INTEGER NOT NULL,
    `status` ENUM('BARU', 'CHECK_IN', 'CHECK_OUT') NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_Pemesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pemesanan` INTEGER NOT NULL,
    `id_kamar` INTEGER NOT NULL,
    `tgl_akses` DATETIME(3) NOT NULL,
    `harga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor` INTEGER NOT NULL,
    `id_tipe_kamar` INTEGER NOT NULL,

    UNIQUE INDEX `Kamar_nomor_key`(`nomor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipe_Kamar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `Tipe_Kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Pemesanan` ADD CONSTRAINT `Detail_Pemesanan_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `Kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_Pemesanan` ADD CONSTRAINT `Detail_Pemesanan_id_pemesanan_fkey` FOREIGN KEY (`id_pemesanan`) REFERENCES `Pemesanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kamar` ADD CONSTRAINT `Kamar_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `Tipe_Kamar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
