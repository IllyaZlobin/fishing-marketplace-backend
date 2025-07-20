import { ValidationError } from '@nestjs/common';
import { iterate } from 'iterare';

import { AppError } from '~/common/errors';

export const createExceptionFactory = () => {
  return (validationErrors: ValidationError[] = []) => {
    const errors = flattenValidationErrors(validationErrors);
    const formattedErrors = errors.join(', ');
    return new AppError(AppError.Types.INVALID_DATA, formattedErrors, 400, errors);
  };
};

const flattenValidationErrors = (validationErrors: ValidationError[]): string[] => {
  return iterate(validationErrors)
    .map((error) => mapChildrenToValidationErrors(error))
    .flatten()
    .filter((item) => !!item.constraints)
    .map((item) => (item.constraints ? Object.values(item.constraints) : []))
    .flatten()
    .toArray();
};

const mapChildrenToValidationErrors = (error: ValidationError, parentPath?: string): ValidationError[] => {
  if (!(error.children && error.children.length)) {
    return [error];
  }
  const validationErrors: ValidationError[] = [];
  parentPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  for (const item of error.children) {
    if (item.children && item.children.length) {
      validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
    }
    validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }
  return validationErrors;
};

const prependConstraintsWithParentProp = (parentPath: string, error: ValidationError): ValidationError => {
  const constraints: Record<string, string> = {};
  for (const key in error.constraints) {
    constraints[key] = `${parentPath}.${error.constraints[key]}`;
  }
  return {
    ...error,
    constraints
  };
};
