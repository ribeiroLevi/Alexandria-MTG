import { Landing } from './components/landing';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lib } from './components/lib';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/lib" element={<Lib />} />
      </Routes>
    </Router>
  );
}
