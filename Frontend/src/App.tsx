import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SharedBrain from './pages/SharedBrain.tsx'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Backgroundvideo from '../components/BackGroundvideo.tsx'

function App() {
  return (
    // <Backgroundvideo>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:shareLink" element={<SharedBrain />} />
        </Routes>
    </BrowserRouter>
    // </Backgroundvideo>
  )
}

export default App

