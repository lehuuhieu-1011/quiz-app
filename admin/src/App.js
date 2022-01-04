import 'antd/dist/antd.min.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import Login from './pages/Login'
import ManageCourse from './pages/ManageCourse'
import ManageQuestion from './pages/ManageQuestion'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Waiting from './pages/Waiting'

function App() {
  const { pathname } = useLocation()

  return (
    <div>
      {pathname !== '/waiting' ? (<LayoutHeader />) : null}
      <div style={{ paddingBottom: 100, paddingTop: 100 }}>
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="manageCourse" element={<ManageCourse />} />
          <Route path="manageQuestion/:idCourse" element={<ManageQuestion />} />
          <Route path="register" element={<Register />} />
          <Route path="waiting" element={<Waiting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {pathname !== '/waiting' ? (<LayoutFooter />) : null}
    </div >
  )
}

export default App
