import { useIngestro, useIngestroData } from "@ingestro/react"
import { useState } from "react";
import { ActiveCellInput } from "./ActiveCellInput";

export const DataTable = () => {
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null);
  const store = useIngestro();
  const data = useIngestroData();

  const handleUpdate = (rowId: string, columnId: string, type: string) => (value: string) => {
    let finalValue: string | number | boolean = value;

    // Cast based on column type
    if (type === 'number') {
        const num = parseFloat(value);
        if (!isNaN(num)) {
          finalValue = num;
        }
    } else if (type === 'boolean') {
        finalValue = value === 'true';
    }

    store.updateCell(rowId, columnId, finalValue);
    setEditingCell(null);
  }

  if(data.rows.length === 0) {
    return (
      <p>No data loaded yet. Please upload a file</p>
    )
  }

  return (
    <div>
      <h3>2. Review Data</h3>
      <div>
        <table className="grid-table">
          <thead>
            <tr>
              {data.columns.map(column => (
                <th key={column.id} className="header">{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map(row => (
              <tr key={row.id}>
                {/* For each row loop through columns so the order match headers */}
                {data.columns.map(column => {
                  const isEditing = editingCell?.rowId === row.id && editingCell?.columnId === column.id;
                  const hasError = !!row.errors?.[column.id];
                  return (
                    <td className={`row ${hasError ? 'error' : ''} ${isEditing && column.type !== 'boolean' ? 'editing' : ''}`}
                      key={column.id}
                      onClick={() => setEditingCell({ rowId: row.id, columnId: column.id })}
                      title={hasError ? row.errors?.[column.id] : undefined}
                    >
                      {column.type === 'boolean' ? (
                        <input
                          type="checkbox"
                          checked={Boolean(row.data[column.id])}
                          onChange={e => store.updateCell(row.id, column.id, e.target.checked)}
                        />
                      ) : isEditing ? (
                        <ActiveCellInput
                          initialValue={row.data[column.id]}
                          onCommit={handleUpdate(row.id, column.id, column.type)}
                          onCancel={() => setEditingCell(null)}
                        />
                      ) : (
                        <div className="relative">
                          {String(row.data[column.id] ?? '')}
                          {hasError && (
                            <span className="error-tooltip">
                              {row.errors?.[column.id]}
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                  )
              })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
