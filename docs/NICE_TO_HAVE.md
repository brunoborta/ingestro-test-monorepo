# Future Improvements

Things we'd add if this project continues. Organized by priority.

## High Priority

### 1. Validate on Load
Currently, errors only appear after editing a cell. Pre-existing bad data (e.g., "abc" in an Age column) isn't flagged until touched.

**Solution**: Add a `validateAll()` method to the store. Call it after `loadData()`.

### 2. Undo/Redo
No way to revert changes. Would need a command history stack in the store.

### 3. Export Modified Data
Users can edit but can't download the corrected JSON. Add a "Download" button that calls `JSON.stringify(store.getData())`.

---

## Medium Priority

### 4. Date Picker for Date Columns
We infer `date` type but render as plain text. A proper `<input type="date">` or library picker would improve UX.

### 5. Boolean Toggle
Booleans require typing "true"/"false". A checkbox or toggle would be cleaner.

### 6. Column Sorting
Click header to sort ascending/descending. We started this but didn't finish.

---

## Low Priority (Nice-to-Have)

### 7. Keyboard Navigation
Arrow keys to move between cells. Enter to edit. Tab to move right.

### 8. Virtualization
For datasets > 1000 rows, use `react-window` to avoid DOM bloat.

### 9. Responsive / Mobile
Table doesn't adapt to small screens. Would need horizontal scroll or card layout.

### 10. Dark Mode
Because why not.
