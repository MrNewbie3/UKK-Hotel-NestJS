import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipeKamarDto } from './dto/create-tipe_kamar.dto';
import { ImageKitService } from 'src/service/imagekit_service';
import { UpdateTipeKamarDto } from './dto/update-tipe_kamar.dto';
import { HelperService } from 'src/helper/helper.service';

@Injectable()
export class TipeKamarService {
  constructor(
    private prismaService: PrismaService,
    private readonly imageService: ImageKitService,
    private readonly helper: HelperService,
  ) {}
  async create(
    createTipeKamarDto: CreateTipeKamarDto,
    foto: Buffer,
    response: Response,
  ): Promise<any> {
    let payload = createTipeKamarDto;
    if (foto) {
      const uploadImage = await this.imageService.uploadFiles(
        foto,
        `${createTipeKamarDto.nama}_${new Date()}.jpg`,
      );
      if (!uploadImage) {
        return this.helper.internalServerErrorWrapper(response, uploadImage);
      }
      payload = {
        ...createTipeKamarDto,
        foto: uploadImage,
        harga: Number(createTipeKamarDto.harga),
      };
    }
    try {
      const roomTypes = await this.prismaService.tipe_Kamar.create({
        data: payload,
      });
      return this.helper.createdWrapper(response, roomTypes);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findAll(response: Response): Promise<any> {
    try {
      const roomTypes = await this.prismaService.tipe_Kamar.findMany();
      return this.helper.successWrapper(response, roomTypes);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async findOne(id: number, response: Response): Promise<any> {
    try {
      const roomTypes = await this.prismaService.tipe_Kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      return this.helper.successWrapper(response, roomTypes);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async update(
    id: number,
    updateTipeKamarDto: UpdateTipeKamarDto,
    response: Response,
    foto: Buffer,
  ): Promise<any> {
    let payload = updateTipeKamarDto;
    try {
      const isRoomExist = await this.prismaService.tipe_Kamar.findMany({
        where: {
          id: Number(id),
        },
      });

      if (isRoomExist.length < 1) {
        return this.helper.notFoundWrapper(response, { id });
      }
      if (foto) {
        const updateImage = await this.imageService.uploadFiles(
          foto,
          `${updateTipeKamarDto.nama}_${new Date()}.jpg`,
        );
        if (!updateImage) {
          return this.helper.internalServerErrorWrapper(response, updateImage);
        }
        payload = {
          ...updateTipeKamarDto,
          foto: updateImage,
          harga: Number(updateTipeKamarDto.harga),
        };
      }
      const roomTypes = await this.prismaService.tipe_Kamar.update({
        where: {
          id: Number(id),
        },
        data: payload,
      });
      return this.helper.successWrapper(response, roomTypes);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }

  async remove(id: number, response: Response): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length < 1) {
        return this.helper.notFoundWrapper(response, { id });
      }
      const roomTypes = await this.prismaService.tipe_Kamar.delete({
        where: {
          id: Number(id),
        },
      });
      return this.helper.successWrapper(response, roomTypes);
    } catch (error) {
      this.helper.internalServerErrorWrapper(response, error);
      throw new Error(error);
    }
  }
}
