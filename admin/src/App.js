import 'antd/dist/antd.css'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutFooter from './components/Footer'
import LayoutHeader from './components/Header'
import ManageCourse from './pages/ManageCourse'
import ManageQuestion from './pages/ManageQuestion'

function App() {
  return (
    <div>
      <LayoutHeader />
      <div style={{ marginTop: 80 }}>
        <Routes>
          <Route path="/" element={<ManageCourse />} />
          <Route path="/manageCourse" element={<ManageCourse />} />
          <Route path="/manageQuestion/:idCourse" element={<ManageQuestion />} />
        </Routes>
      </div>
      <LayoutFooter />
    </div>
  )
}

export default App
