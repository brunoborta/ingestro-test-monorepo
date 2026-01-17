import { CellValue, ParsedData } from "../types"

export const createStore = () => {
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
