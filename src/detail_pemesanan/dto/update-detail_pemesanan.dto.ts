import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailPemesananDto } from './create-detail_pemesanan.dto';

export class UpdateDetailPemesananDto extends PartialType(
  CreateDetailPemesananDto,
) {}
