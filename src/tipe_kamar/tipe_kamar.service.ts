import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipeKamarDto } from './dto/create-tipe_kamar.dto';
import { ImageKitService } from 'src/service/imagekit_service';
import { UpdateTipeKamarDto } from './dto/update-tipe_kamar.dto';

@Injectable()
export class TipeKamarService {
  constructor(
    private prismaService: PrismaService,
    private readonly imageService: ImageKitService,
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
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send(new InternalServerErrorException());
      }
      payload = { ...createTipeKamarDto, foto: uploadImage };
    }
    try {
      const RoomTypes = await this.prismaService.tipe_Kamar.create({
        data: payload,
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const RoomTypes = await this.prismaService.tipe_Kamar.findMany();
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const RoomTypes = await this.prismaService.tipe_Kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: number,
    updateTipeKamarDto: UpdateTipeKamarDto,
    res: Response,
    foto: Buffer,
  ): Promise<any> {
    let payload = updateTipeKamarDto;
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      if (foto) {
        const updateImage = await this.imageService.uploadFiles(
          foto,
          `${updateTipeKamarDto.nama}_${new Date()}.jpg`,
        );
        if (!updateImage) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(new InternalServerErrorException());
        }
        payload = { ...updateTipeKamarDto, foto: updateImage };
      }
      const RoomTypes = await this.prismaService.tipe_Kamar.update({
        where: {
          id: Number(id),
        },
        data: payload,
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number, res: Response): Promise<any> {
    try {
      const isRoomExist = await this.prismaService.kamar.findMany({
        where: {
          id: Number(id),
        },
      });
      if (isRoomExist.length < 1) {
        return res.status(HttpStatus.NOT_FOUND).send(new NotFoundException());
      }
      const RoomTypes = await this.prismaService.tipe_Kamar.delete({
        where: {
          id: Number(id),
        },
      });
      return RoomTypes;
    } catch (error) {
      throw new Error(error);
    }
  }
}
