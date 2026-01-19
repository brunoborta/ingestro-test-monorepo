import { parseJSON } from "@borta/core";
import { useIngestro } from "@borta/react";
import { useState } from "react";

export const FileUploader = () => {
  const store = useIngestro();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await parseJSON(file);
      store.loadData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-container">
      <h3>1. Upload Data</h3>
      <input type="file" accept=".json" onChange={handleFileChange} disabled={loading} />
      {loading && <span style={{ marginLeft: '10px' }}>Loading...</span>}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
    </div>
  );
}
