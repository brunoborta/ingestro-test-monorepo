import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IngestroProvider } from '@ingestro/react'
import App from './App.tsx'

import { isNumber, isBoolean, required, compose, range, isDate } from '@ingestro/core';

// Dictionary of rules that can be composed
const rules = {
  // User data rules
  age: compose(required(), isNumber(), range(0, 100)),
  name: required(),
  email: required(),
  birthDate: compose(required(), isDate()),

  // Product data rules
  product: required(),
  price: compose(required(), isNumber(), range(0, 10000)),
  inStock: compose(required(), isBoolean()),
  releaseDate: compose(required(), isDate())
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IngestroProvider rules={rules}>
      <App />
    </IngestroProvider>
  </StrictMode>,
)
