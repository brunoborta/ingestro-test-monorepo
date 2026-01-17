import { describe, it, expect } from 'vitest';
import { isNumber, required, compose, isString, range } from './index';

describe('Validator', () => {
  it('should pass validation for non-empty value', () => {
    const validate = required();
    const result = validate('hello', {} as any);

    expect(result.valid).toBe(true);
  });

  it('should fail validation for null value', () => {
    const validate = required();
    const result = validate(null, {} as any);

    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('should validate number type', () => {
    const validate = isNumber();

    expect(validate(42, {} as any).valid).toBe(true);
    expect(validate('not a number', {} as any).valid).toBe(false);
  });

  it('should compose multiple validators', () => {
    const validate = compose(required(), isNumber());

    expect(validate(42, {} as any).valid).toBe(true);
    expect(validate(null, {} as any).valid).toBe(false);

    const result = validate('NaN', {} as any);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Value must be a number');
  });

  it('should validate string type', () => {
    const validate = isString();

    expect(validate('hello', {} as any).valid).toBe(true);
    expect(validate(42, {} as any).valid).toBe(false);
    expect(validate(null, {} as any).valid).toBe(false);
  });

  it('should validate number range', () => {
    const validate = range(0, 100);

    expect(validate(50, {} as any).valid).toBe(true);
    expect(validate(0, {} as any).valid).toBe(true);
    expect(validate(100, {} as any).valid).toBe(true);

    const resultLow = validate(-1, {} as any);
    expect(resultLow.valid).toBe(false);
    expect(resultLow.error).toContain('0');

    const resultHigh = validate(101, {} as any);
    expect(resultHigh.valid).toBe(false);
    expect(resultHigh.error).toContain('100');
  });
});
