import 'antd/dist/antd.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Question from './pages/Question'
import Waiting from './pages/Waiting'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/waiting" element={<Waiting />} />
    </Routes>
  )
}

export default App
