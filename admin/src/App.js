import 'antd/dist/antd.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import Login from './pages/Login'
import ManageCourse from './pages/ManageCourse'
import ManageQuestion from './pages/ManageQuestion'
import Register from './pages/Register'

function App() {
  return (
    <div>
      <LayoutHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manageCourse" element={<ManageCourse />} />
        <Route path="/manageQuestion/:idCourse" element={<ManageQuestion />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <LayoutFooter />
    </div>
  )
}

export default App
