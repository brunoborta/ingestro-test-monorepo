import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IngestroProvider } from '@ingestro/react'
import App from './App.tsx'

import { isNumber, required, compose, range } from '@ingestro/core';

// Dictionary of rules that can be composed
const rules = {
  age: compose(required(), isNumber(), range(0, 100)),
  name: required(),
  email: required(),
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IngestroProvider rules={rules}>
      <App />
    </IngestroProvider>
  </StrictMode>,
)
