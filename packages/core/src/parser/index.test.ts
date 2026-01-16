import { describe, it, expect } from 'vitest';
import { parseJSON, isFlatObject } from './index';

describe('parseJSON', () => {
  it('should parse valid JSON file', async () => {
    const jsonData = JSON.stringify([
      { name: 'Borta', age: 37 },
      { name: 'Luana', age: 43 }
    ]);

    const file = new File([jsonData], 'test.json', { type: 'application/json' });

    const result = await parseJSON(file);

    expect(result).toEqual([
      { name: 'Borta', age: 37 },
      { name: 'Luana', age: 43 }
    ]);
  });

  it('should throw error for invalid JSON', async () => {
    const invalidJson = "{ this is not valid json }";
    const file = new File([invalidJson], 'test.json', { type: 'application/json' });

    await expect(parseJSON(file)).rejects.toThrow();
    });

    it('should throw error for empty file', async () => {
    const file = new File([''], 'test.json', { type: 'application/json' });

    await expect(parseJSON(file)).rejects.toThrow();
  });

  it('should throw error if JSON is not an array', async () => {
    const jsonData = JSON.stringify({ name: 'John' });
    const file = new File([jsonData], 'test.json', { type: 'application/json' });

    await expect(parseJSON(file)).rejects.toThrow();
  });

  it('should throw error for empty array', async () => {
    const jsonData = JSON.stringify([]);
    const file = new File([jsonData], 'test.json', { type: 'application/json' });

    await expect(parseJSON(file)).rejects.toThrow();
  });
});

describe('isFlatObject', () => {
  it('should return true for flat object', () => {
    const obj = { name: 'John', age: 25, active: true };
    expect(isFlatObject(obj)).toBe(true);
  });

  // Empty row
  it('should return true for empty object', () => {
    expect(isFlatObject({})).toBe(true);
  });

  it('should return true for object with null values', () => {
    const obj = { name: 'John', middle: null };
    expect(isFlatObject(obj)).toBe(true);
  });

  it('should return true for object with Date value', () => {
    const obj = { name: 'John', created: new Date() };
    expect(isFlatObject(obj)).toBe(true);
  });

  it('should return false for object with nested object', () => {
    const obj = { name: 'John', address: { city: 'NY' } };
    expect(isFlatObject(obj)).toBe(false);
  });

  it('should return false for object with array value', () => {
    const obj = { name: 'John', tags: ['dev', 'senior'] };
    expect(isFlatObject(obj)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isFlatObject([1, 2, 3])).toBe(false);
  });

  it('should return false for null', () => {
    expect(isFlatObject(null)).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isFlatObject('string')).toBe(false);
    expect(isFlatObject(42)).toBe(false);
    expect(isFlatObject(true)).toBe(false);
    expect(isFlatObject(undefined)).toBe(false);
  });
});

