import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class HelperService {
  @HttpCode(HttpStatus.OK)
  successWrapper(
    response?: Response,
    data?: any,
    message?: string,
  ): Response<any> {
    return response.send({
      success: true,
      msg: message || 'success providing services',
      data: data || [],
      code: HttpStatus.OK,
    });
  }

  @HttpCode(HttpStatus.CREATED)
  createdWrapper(
    response?: Response,
    data?: any,
    message?: string,
  ): Response<any> {
    return response.send({
      success: true,
      msg: message || 'data created successfully',
      data: data || [],
      code: HttpStatus.CREATED,
    });
  }

  @HttpCode(HttpStatus.NOT_FOUND)
  notFoundWrapper(response: Response, data: any): Response<any> {
    return response.send({
      success: false,
      msg: 'Data request was not found',
      data: data,
      code: HttpStatus.NOT_FOUND,
    });
  }

  @HttpCode(HttpStatus.CONFLICT)
  conflictWrapper(response: Response, data: any): Response<any> {
    return response.send({
      success: false,
      msg: 'Data already exists',
      data,
      code: HttpStatus.CONFLICT,
    });
  }

  @HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
  internalServerErrorWrapper(response: Response, error: any): Response<any> {
    return response.send({
      success: false,
      msg: 'Internal Server Error',
      error,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
