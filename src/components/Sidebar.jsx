import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, Wrench, TrendingUp } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/equipment', icon: Stethoscope, label: 'Equipment Inventory' },
  { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
  { to: '/reliability', icon: TrendingUp, label: 'Reliability Analysis' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6">
        <h1 className="text-white text-xl font-bold">🏥 ClinEng HIS</h1>
        <p className="text-teal-400 text-xs mt-1">Clinical Engineering</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mx-2 mb-1 transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white border-l-4 border-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4">
        <p className="text-xs text-slate-500">SBEG202 · Cairo University</p>
      </div>
    </aside>
  );
}
