import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Explorer } from './pages/Explorer';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explorer />} />
        <Route path="/:slug" element={<Explorer />} />
      </Routes>
    </BrowserRouter>
  );
}

