import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lib } from './components/lib';
import { Landing } from './components/landing';

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
