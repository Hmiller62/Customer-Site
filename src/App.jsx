import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import InfoScreen from './pages/infoScreen'

export default function App() {
  return (
    <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/customer/:id" element={<InfoScreen />} />
    </Routes>
  )
}