import { CellValue, ParsedData, ValidationRule } from "../types"

export const createStore = (rules: Record<string, ValidationRule> = {}) => {
  // Closure to hold state
  let data: ParsedData | null = null;
  let listeners: Array<(data: ParsedData) => void> = [];

  const notify = () => {
    if (data) {
      listeners.forEach(listener => listener(data!));
    }
  }
  return {
    loadData: (parsedData: ParsedData) => {
      data = parsedData;

      // Validate immediately after loading
      data.rows.forEach(row => {
        data!.columns.forEach(column => {
          const validator = rules[column.id];
          if (validator) {
            const result = validator(row.data[column.id]!, row);
            if (!row.errors) row.errors = {};
            if (!result.valid && result.error) {
              row.errors[column.id] = result.error;
            } else {
              delete row.errors[column.id];
            }
          }
        });
      });
      notify();
    },

    getData: (): ParsedData => {
      if(!data) {
        return {
          columns: [],
          rows: []
        }
      }
      return data;
    },

    updateCell: (rowId: string, columnId: string, value: CellValue) => {
      if(!data) return;

      const row = data.rows.find(r => r.id === rowId);
      if(row) {
        row.data[columnId] = value;
        // Look for validation of the type of column
        const columnValidator = rules[columnId];
        if(columnValidator) {
        // See if the new value is valid
          const result = columnValidator(value, row);
          if(!row.errors) {
            row.errors = {}
          }
          if(!result.valid && result.error) {
            row.errors[columnId] = result.error;
          } else {
            delete row.errors[columnId];
          }
        }
        notify();
      }
    },

    // listener is a callback function that gets called when data change
    subscribe: (listener: (data: ParsedData) => void) => {
      listeners.push(listener);
      return () => {
        // remove the listener
        listeners = listeners.filter(l => l !== listener);
      }
    }
  }
}
