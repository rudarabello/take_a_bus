import React from 'react';
import {DataProvider} from './src/contexts/provider.js';
import Home from './src/pages/home/index.js';

export default function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}
