import 'antd/dist/antd.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Question from './pages/Question';
import Score from './pages/Score';
import Start from './pages/Start';


function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/start" element={<Start />} />
      <Route path="/score" element={<Score />} />
    </Routes>
  );
}

export default App;
