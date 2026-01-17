import { describe, it, expect } from 'vitest';
import { createStore } from './index';
describe('Store', () => {
  it('should create a store instance', () => {
    const store = createStore();
    expect(store).toBeDefined();
  });

  it('should load data from parsed result', () => {
    const store = createStore();

    const parsedData = {
      columns: [
        { id: 'name', name: 'name', type: 'string' as const },
        { id: 'age', name: 'age', type: 'number' as const }
      ],
      rows: [
        { id: 'row-0', data: { name: 'John', age: 25 } }
      ]
    };

    store.loadData(parsedData);

    const data = store.getData();
    expect(data.rows).toHaveLength(1);
    expect(data.columns).toHaveLength(2);
  });
  
  it('should update a cell value', () => {
    const store = createStore();

    const parsedData = {
      columns: [{ id: 'age', name: 'age', type: 'number' as const }],
      rows: [{ id: 'row-0', data: { age: 25 } }]
    };

    store.loadData(parsedData);
    store.updateCell('row-0', 'age', 26);

    const data = store.getData();
    expect(data.rows[0]!.data.age).toBe(26);
  });

  it('should notify subscribers when data changes', () => {
    const store = createStore();

    let notified = false;
    store.subscribe(() => {
      notified = true;
    });

    const parsedData = {
      columns: [{ id: 'age', name: 'age', type: 'number' as const }],
      rows: [{ id: 'row-0', data: { age: 25 } }]
    };

    store.loadData(parsedData);
    expect(notified).toBe(true);
  });

});
