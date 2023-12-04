import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import List from './components/list.js'
import Detail from './components/employeeDetail.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employees" element={<List />} />
        <Route path="/employees/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
