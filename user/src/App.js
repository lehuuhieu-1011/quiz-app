import 'antd/dist/antd.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'
import Question from './pages/Question'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/question" element={<Question />} />
    </Routes>
  )
}

export default App
