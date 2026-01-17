export type CellValue = string | number | boolean | Date | null;
// These values will come from the parser
export type ColumnType = 'string' | 'number' | 'boolean' | 'date' | 'unknown';

export interface ColumnDefinition {
  id: string;
  name: string;
  type: ColumnType;
}

// A single line
export interface DataRow {
  id: string;
  data: Record<string, CellValue>;
  errors?: Record<string, string>;
}

export interface ParsedData {
  columns: ColumnDefinition[];
  rows: DataRow[];
}
