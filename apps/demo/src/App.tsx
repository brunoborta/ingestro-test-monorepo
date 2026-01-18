import './global.css';
import { FileUploader } from './components/FileUploader';
import { DataTable } from './components/DataTable';

function App() {
  return (
    <div className="container">
      <h1>Ingestro Demo</h1>
      <FileUploader />
      <DataTable />
    </div>
  );
}

export default App;
