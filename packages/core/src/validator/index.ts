import { CellValue, ValidationRule } from "../types";

export const compose = (...validators: ValidationRule[]): ValidationRule => {
  return (value: CellValue, row) => {
    for (const validator of validators) {
      const result = validator(value, row);
      if (!result.valid) {
        return result; // Get out of the function
      }
    }
    return { valid: true };
  };
};

// Factory of validators - range, min, max, etc
export const required = (): ValidationRule => {
  return (value: CellValue) => {
    if(value === null || value === undefined || value === '') {
      return {
        valid: false,
        error: 'This field is required!'
      };
    }
    return {
      valid: true
    }
  }
}

export const isNumber = (): ValidationRule => {
  return (value: CellValue) => {
    if(typeof value !== 'number') {
      return {
        valid: false,
        error: 'Value must be a number'
      };
    }
    return {
      valid: true
    }
  }
}

export const isString = (): ValidationRule => {
  return (value: CellValue) => {
    if (typeof value !== 'string') {
      return {
        valid: false,
        error: 'Must be a string'
      };
    }
    return {
      valid: true
    };
  };
};

export const range = (min: number, max: number): ValidationRule => {
  return (value: CellValue) => {
    if (typeof value !== 'number') {
      return {
        valid: false,
        error: 'Value must be a number'
      };
    }
    if (value < min || value > max) {
      return {
        valid: false,
        error: `Value must be between ${min} and ${max}`
      };
    }
    return {
      valid: true
    };
  };
};

