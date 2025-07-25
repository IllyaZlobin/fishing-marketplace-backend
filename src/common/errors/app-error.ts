import { AppErrorType } from './error-types';

export class AppError extends Error {
  type: AppErrorType;
  message: string;
  code?: number;
  errors?: string[];
  date: Date;
  static Types = AppErrorType;

  constructor(type: AppErrorType, message: string, errors: string[] = [], code?: number, ...params: any) {
    super(...params);

    this.type = type;
    this.message = message;
    this.code = code;
    this.errors = errors;
    this.date = new Date();
  }
}
