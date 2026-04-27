import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EquipmentInventory from './pages/EquipmentInventory';
import MaintenanceManagement from './pages/MaintenanceManagement';
import ReliabilityAnalysis from './pages/ReliabilityAnalysis';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="equipment" element={<EquipmentInventory />} />
          <Route path="maintenance" element={<MaintenanceManagement />} />
          <Route path="reliability" element={<ReliabilityAnalysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
