import { createContext, ReactNode, useContext, useMemo } from 'react';
import { createStore } from '@ingestro/core';

type Store = ReturnType<typeof createStore>;

const IngestroContext = createContext<Store | null>(null);

export const IngestroProvider = ({ children }: { children: ReactNode }) => {
  const store = useMemo(() => createStore(), []);

  return (
    <IngestroContext.Provider value={store}>
      {children}
    </IngestroContext.Provider>
  )
};

export const useIngestro = (): Store => {
  const context = useContext(IngestroContext);
  if(!context) {
    throw new Error('useIngestro must be used within IngestroProvider');
  }
  return context;
}
