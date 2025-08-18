import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import InfoScreen from './pages/infoScreen'
import Database from "./utils/database"

export default function App() {
  const [customers, setCustomers] = useState(Database);

  useEffect(() => {
      localStorage.setItem("database", JSON.stringify(customers));  //update database upon rendering
    }, [customers]);

  return (
    <Routes>
        <Route path="*" element={<Dashboard customers={customers} setCustomers={setCustomers}/>} />
        <Route path="/customer/:id" element={<InfoScreen customers={customers} setCustomers={setCustomers}/>} />
    </Routes>
  )
}