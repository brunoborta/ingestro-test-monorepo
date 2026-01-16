

export async function parseJSON(file: File) {
  // basic size limits (10mb)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File exceeds 10mb limit')
  }

  // empty file
  if (file.size === 0) {
    throw new Error('File is empty')
  }

  const content = await file.text();
  const data = JSON.parse(content);

  if (!Array.isArray(data)) {
    throw new Error('JSON must be an array');
  }

  if (data.length === 0) {
    throw new Error('Array contains no data');
  }

  // Check all items are flat objects
  const allFlat = data.every(isFlatObject);

  if (!allFlat) {
    throw new Error('Nested objects/arrays not supported');
  }

  return data;
}

export function isFlatObject(obj: unknown): boolean {
  // everything other than object (including array) is rejected
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  return Object.values(obj).every(value => {
    return value === null || typeof value !== 'object' || value instanceof Date;
  });
}
