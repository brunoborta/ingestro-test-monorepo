import { type CellValue } from '@borta/core';
import { useState, type ChangeEvent } from 'react';

interface ActiveCellInputProps {
  initialValue: CellValue;
  onCommit: (newValue: string) => void;
  onCancel: () => void;
}
export const ActiveCellInput = ({ initialValue, onCommit, onCancel }: ActiveCellInputProps) => {
  const [value, setValue] = useState(String(initialValue ?? ''));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleBlur = () => {
    if(value === String(initialValue ?? '')) {
      onCancel();
    } else {
      onCommit(value);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommit(value);
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <input
      autoFocus
      value={value}
      className="active-cell"
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}
