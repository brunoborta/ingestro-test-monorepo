import { ParsedData } from "@ingestro/core";
import { useIngestro } from "../IngestroProvider";
import { useEffect, useState } from "react";


export const useIngestroData = (): ParsedData => {
  const store = useIngestro();
  const [data, setData] = useState<ParsedData>(store.getData());

  useEffect(() => {
    // Subscribe on mount, returns unsubscribe function
    const unsubscribe = store.subscribe(setData);
    return unsubscribe;
  }, [store]);

  return data;
}
