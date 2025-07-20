import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

import { AppError, AppErrorType } from '~/common/errors';

@Catch(AppError)
export class AppErrorExceptionFilter implements ExceptionFilter<AppError> {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorType = exception.type || exception.name;
    const errObj: any = {
      code: exception.code,
      type: exception.type,
      message: exception.message
    };
    let status = 500;
    switch (errorType) {
      case AppError.Types.INVALID_DATA:
      case AppError.Types.INVALID_ARGUMENT:
        status = 400;
        errObj.errors = exception.errors;
        break;
      case AppError.Types.UNAUTHORIZED:
        status = 401;
        break;
      case AppError.Types.FORBIDDEN:
        status = 403;
        break;
      case AppError.Types.NOT_FOUND:
        status = 404;
        break;
      case AppError.Types.CONFLICT:
        status = 409;
        break;
      case AppError.Types.TOO_MANY_REQUESTS:
        status = 429;
        break;
      case AppError.Types.SERVICE_UNAVAILABLE:
        status = 500;
        break;
      default:
        errObj.code = 500;
        errObj.message = 'An unknown error occurred';
        errObj.type = AppErrorType.SERVICE_UNAVAILABLE;
        break;
    }
    response.status(status).json(errObj);
  }
}
