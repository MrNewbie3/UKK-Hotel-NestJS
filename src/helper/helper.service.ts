import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class HelperService {
  private generateResponse(
    code: number,
    message: string,
    data: any,
    success?: boolean,
    pagination?: any,
  ): any {
    return {
      meta: {
        code,
        message,
        success: success ? true : false,
      },
      data,
      pagination,
    };
  }
  successWrapper(
    response?: Response,
    data?: any,
    message?: string,
    pagination?: any,
  ): Response<any> {
    return response
      .status(HttpStatus.OK)
      .send(
        this.generateResponse(
          HttpStatus.OK,
          message || 'success providing services',
          data || [],
          true,
          pagination,
        ),
      );
  }

  createdWrapper(
    response?: Response,
    data?: any,
    message?: string,
  ): Response<any> {
    return response
      .status(HttpStatus.CREATED)
      .send(
        this.generateResponse(
          HttpStatus.CREATED,
          message || 'data created successfully',
          data || [],
          true,
        ),
      );
  }

  notFoundWrapper(response: Response, data?: any): Response<any> {
    return response
      .status(HttpStatus.NOT_FOUND)
      .send(
        this.generateResponse(
          HttpStatus.NOT_FOUND,
          'Data request was not found',
          data,
        ),
      );
  }

  conflictWrapper(response: Response, data: any): Response<any> {
    return response
      .status(HttpStatus.CONFLICT)
      .send(
        this.generateResponse(HttpStatus.CONFLICT, 'Data already exists', data),
      );
  }
  unauthorizedHelper(response: Response, data?: any): Response<any> {
    return response
      .status(HttpStatus.UNAUTHORIZED)
      .send(
        this.generateResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized', data),
      );
  }

  internalServerErrorWrapper(response: Response, error: any): Response<any> {
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(
        this.generateResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Internal Server Error',
          { error },
        ),
      );
  }
  badRequestHelper(
    response: Response,
    error: any,
    message?: string,
  ): Response<any> {
    return response
      .status(HttpStatus.BAD_REQUEST)
      .send(this.generateResponse(HttpStatus.BAD_REQUEST, message, { error }));
  }
}
