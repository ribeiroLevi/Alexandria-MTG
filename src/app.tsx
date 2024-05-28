import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lib } from './components/lib';
import { Landing } from './components/landing';
import { FavsProvider } from './context/favsContext';
import { Favs } from './components/favs';

export function App() {
  return (
    <Router>
      <FavsProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/lib" element={<Lib />} />
          <Route path="/favs" element={<Favs />} />
        </Routes>
      </FavsProvider>
    </Router>
  );
}
