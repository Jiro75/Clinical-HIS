import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const pageTitles = {
  '/': 'Dashboard',
  '/equipment': 'Equipment Inventory',
  '/maintenance': 'Maintenance Management',
  '/reliability': 'Reliability Analysis',
};

export default function Layout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'HIS';
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
