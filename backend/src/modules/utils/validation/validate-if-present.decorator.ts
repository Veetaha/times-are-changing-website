import { ValidateIf } from 'class-validator';

export const ValidateIfPresent = ValidateIf((_obj, value) => value != null);