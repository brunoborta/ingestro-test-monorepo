import { createContext, ReactNode, useContext, useMemo } from 'react';
import { createStore, ValidationRule } from '@ingestro/core';

type Store = ReturnType<typeof createStore>;

interface IngestroProviderProps {
  children: ReactNode;
  rules?: Record<string, ValidationRule>
}

const IngestroContext = createContext<Store | null>(null);

export const IngestroProvider = ({ children, rules }: IngestroProviderProps) => {
  const store = useMemo(() => createStore(rules), [rules]);

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
