import { ColumnType, ParsedData } from "../types";

export const parseJSON = async (file: File): Promise<ParsedData> => {
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

  // End of checks, start to normalize the data
  const columnMap = new Map<string, ColumnType>();
  data.forEach(row => {
    Object.entries(row).forEach(([key, value]) => {
      const inferredType = inferType(value);
      const previousColumnType = columnMap.get(key);
      // Update if no type yet or type is unknown
      if(!previousColumnType || previousColumnType === 'unknown') {
        columnMap.set(key, inferredType)
      }
    })
  })

  const columns = Array.from(columnMap.entries()).map(([key, type]) => ({
    id: key,
    name: key,
    type
  }))

  const rows = data.map((item, index) => ({
    id: `row-${index}`,
    data: item
  }))

  return { columns, rows };
}

export const isFlatObject = (obj: unknown): boolean => {
  // everything other than object (including array) is rejected
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  return Object.values(obj).every(value => {
    return value === null || typeof value !== 'object' || value instanceof Date;
  });
}

// More scalable than go with typeof + handle null and ISO dates
const inferType = (value: unknown): ColumnType => {
  if (value === null || value === undefined) {
    return 'unknown';
  }

  if (typeof value === 'string') {
    // Check if it's a ISO date string
    if (/^\d{4}-\d{2}-\d{2}/.test(value) && !isNaN(Date.parse(value))) {
      return 'date';
    }
    return 'string';
  }

  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (value instanceof Date) return 'date';

  return 'unknown';
}
