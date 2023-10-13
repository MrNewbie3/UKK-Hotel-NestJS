-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN_DUDI', 'SISWA', 'GURU', 'ORANG_TUA', 'ADMIN_SEKOLAH', 'SUPERADMIN') NOT NULL,
    `nomerHp` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dudi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaDudi` VARCHAR(191) NOT NULL,
    `fromPt` VARCHAR(191) NOT NULL,
    `alamatDudi` VARCHAR(191) NOT NULL,
    `noTelp` VARCHAR(191) NOT NULL,
    `fotoIndustri` VARCHAR(191) NOT NULL,
    `profilSingkat` VARCHAR(191) NOT NULL,
    `mediaSosial` VARCHAR(191) NOT NULL,
    `namaPenanggungJawab` VARCHAR(191) NOT NULL,
    `bidang` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Dudi_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kelas` VARCHAR(191) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,
    `tempatTanggalLahir` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Siswa_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiswaCompetence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaSertifikat` VARCHAR(191) NOT NULL,
    `jenisSertifikat` VARCHAR(191) NOT NULL,
    `penyelenggara` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `tanggalTerbit` DATETIME(3) NOT NULL,
    `siswaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PortfolioSiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaPortfolio` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `linkPortfolio` VARCHAR(191) NOT NULL,
    `siswaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Casual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `namaCasual` VARCHAR(191) NOT NULL,
    `kategoriCasual` VARCHAR(191) NOT NULL,
    `startCasual` DATETIME(3) NOT NULL,
    `endCasual` DATETIME(3) NOT NULL,
    `lokasi` VARCHAR(191) NOT NULL,
    `waktuPelaksanaan` DATETIME(3) NOT NULL,
    `statusCasual` VARCHAR(191) NOT NULL,
    `dudiId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCasual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `casualId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `casualId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CasualToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CasualToUser_AB_unique`(`A`, `B`),
    INDEX `_CasualToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Dudi` ADD CONSTRAINT `Dudi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiswaCompetence` ADD CONSTRAINT `SiswaCompetence_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PortfolioSiswa` ADD CONSTRAINT `PortfolioSiswa_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Casual` ADD CONSTRAINT `Casual_dudiId_fkey` FOREIGN KEY (`dudiId`) REFERENCES `Dudi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCasual` ADD CONSTRAINT `UserCasual_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCasual` ADD CONSTRAINT `UserCasual_casualId_fkey` FOREIGN KEY (`casualId`) REFERENCES `Casual`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_casualId_fkey` FOREIGN KEY (`casualId`) REFERENCES `Casual`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CasualToUser` ADD CONSTRAINT `_CasualToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Casual`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CasualToUser` ADD CONSTRAINT `_CasualToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
