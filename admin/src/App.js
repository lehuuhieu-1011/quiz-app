import 'antd/dist/antd.min.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import Chat from './pages/Chat'
import Login from './pages/Login'
import ManageCourse from './pages/ManageCourse'
import ManageQuestion from './pages/ManageQuestion'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Waiting from './pages/Waiting'

function App() {
  return (
    // <div>
    //   {window.location.pathname !== '/login' ? (<LayoutHeader />) : ''}
    //   <div style={{ paddingBottom: 100, paddingTop: 100 }}>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/" element={<ManageCourse />} />
    //       <Route path="/manageCourse" element={<ManageCourse />} />
    //       <Route path="/manageQuestion/:idCourse" element={<ManageQuestion />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route path="/waiting" element={<Waiting />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </div>
    //   {window.location.pathname !== '/login' ? (<LayoutFooter />) : ''}
    // </div>
    <div style={{ paddingBottom: 100, paddingTop: 100 }}>
      {window.location.pathname !== '/waiting' ? (<LayoutHeader />) : ''}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ManageCourse />} />
        <Route path="/manageCourse" element={<ManageCourse />} />
        <Route path="/manageQuestion/:idCourse" element={<ManageQuestion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {window.location.pathname !== '/waiting' ? (<LayoutFooter />) : ''}
    </div>
  )
}

export default App
