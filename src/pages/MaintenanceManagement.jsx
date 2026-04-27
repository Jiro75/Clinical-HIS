import { useState } from 'react';
import { workOrders as initialWorkOrders, ipmSchedule as initialIPMSchedule, equipment, spareParts } from '../data/mockData';
import {
  Wrench,
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ClipboardList,
  Building2,
  Factory,
  HardHat,
  Search,
  X,
  Activity,
  Zap,
  Shield,
  Gauge,
  Printer,
  UserCheck,
  TrendingDown,
  Timer,
  Plus,
  Fingerprint,
  Calendar,
  Wrench as WrenchIcon,
  Tag,
  Boxes,
  FileText,
  CheckCircle,
  Hash,
  Coins,
  Package,
  Pencil
} from 'lucide-react';
import { useEffect } from 'react';

// ─── Badge helpers ────────────────────────────────────────────────────────────

const woTypeBadge = {
  'Corrective': 'bg-red-100 text-red-700',
  'Preventive (PM)': 'bg-green-100 text-green-700',
};

const woPriorityBadge = {
  'High': 'bg-red-100 text-red-700',
  'Medium': 'bg-amber-100 text-amber-700',
  'Low': 'bg-slate-100 text-slate-500',
};

const woStatusBadge = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Pending': 'bg-amber-100 text-amber-700',
  'Completed': 'bg-green-100 text-green-700',
  'Scheduled': 'bg-purple-100 text-purple-700',
};

const ipmStatusBadge = {
  'Overdue': 'bg-red-100 text-red-700',
  'Upcoming': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
};

// ─── Pill component ───────────────────────────────────────────────────────────

function SummaryPill({ icon: Icon, label, count, colorClass }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${colorClass}`}>
      <Icon className="w-3.5 h-3.5" />
      {count} {label}
    </span>
  );
}

// ─── Maintenance Levels Card ──────────────────────────────────────────────────

const levels = [
  {
    icon: Building2,
    emoji: '🔧',
    title: 'Organizational',
    badge: 'First-Level',
    badgeColor: 'bg-teal-100 text-teal-700',
    desc: 'Performed on-equipment by the operator or unit staff. Includes inspection, servicing, calibrating, lubricating, adjusting, and replacing minor parts. No specialized training required.',
  },
  {
    icon: Factory,
    emoji: '🏭',
    title: 'Intermediate',
    badge: 'Second-Level',
    badgeColor: 'bg-amber-100 text-amber-700',
    desc: 'Performed off-equipment at a designated maintenance shop. Includes calibrating, repairing, testing, or replacing damaged parts or assemblies. Requires trained technicians.',
  },
  {
    icon: HardHat,
    emoji: '🏗️',
    title: 'Depot',
    badge: 'Third-Level',
    badgeColor: 'bg-red-100 text-red-700',
    desc: 'Performed at a major repair or overhaul facility. Includes full reconditioning, one-to-one replacement of defective parts, and complete system rebuilds. Requires high technical expertise.',
  },
];

function MaintenanceLevelsCard() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-blue-900 mb-4 flex items-center gap-2">
        <Building2 className="w-4 h-4" />
        Maintenance Levels
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <div key={level.title} className="bg-white rounded-lg p-4 border border-blue-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <span className="text-lg">{level.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-blue-800 leading-tight">{level.title}</p>
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${level.badgeColor}`}>
                  {level.badge}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-blue-700/80 leading-relaxed">{level.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI Dashboard Strip ──────────────────────────────────────────────────────

function KPIStrip({ wos, ipms, onMetricClick }) {
  const openWOs = wos.filter(w => w.status !== 'Completed').length;
  const overdueIPMs = ipms.filter(i => i.status === 'Overdue').length;
  const completionRate = Math.round((ipms.filter(i => i.status === 'Completed').length / ipms.length) * 100);

  const metrics = [
    { id: 'open-wo', label: 'Open Work Orders', val: openWOs, icon: Wrench, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'overdue-ipm', label: 'Overdue IPMs', val: overdueIPMs, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'ipm-comp', label: 'IPM Completion', val: `${completionRate}%`, icon: UserCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
    { id: 'mtbf', label: 'Avg. MTBF', val: '27.4m', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'spend', label: 'Monthly Spend', val: '$4,250', icon: Coins, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'cosr', label: 'COSR Ratio', val: '8.4%', icon: TrendingDown, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 print:hidden">
      {metrics.map((kpi) => (
        <button
          key={kpi.id}
          onClick={() => onMetricClick(kpi.id, kpi.label)}
          className={`${kpi.bg} p-4 rounded-2xl border border-white/50 shadow-sm flex flex-col gap-1 text-left transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer group`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-700">{kpi.label}</span>
            <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
          </div>
          <span className={`text-xl font-black ${kpi.color}`}>{kpi.val}</span>
        </button>
      ))}
    </div>
  );
}

// ─── KPI Drill-Down Modal ───────────────────────────────────────────────────

function KPIDetailModal({ selection, onClose, wos, ipms, equipmentList }) {
  if (!selection) return null;

  const { type, label } = selection;

  let data = [];
  let columns = [];

  if (type === 'open-wo') {
    data = wos.filter(w => w.status !== 'Completed');
    columns = ['id', 'equipment', 'priority', 'assignedTo', 'daysOpen'];
  } else if (type === 'overdue-ipm') {
    data = ipms.filter(i => i.status === 'Overdue');
    columns = ['id', 'equipment', 'frequency', 'nextDue', 'assignedTo'];
  } else if (type === 'spend') {
    data = wos.filter(w => (w.partsUsed?.length > 0 || w.laborHours > 0));
    columns = ['id', 'equipment', 'laborHours', 'partsCount', 'totalCost'];
  } else if (type === 'mtbf') {
    data = [...equipmentList].sort((a, b) => a.mtbf - b.mtbf);
    columns = ['name', 'department', 'availability', 'mtbf', 'status'];
  } else {
    data = equipmentList;
    columns = ['name', 'department', 'availability', 'maintenanceLevel'];
  }

  const getVal = (item, col) => {
    if (col === 'partsCount') return item.partsUsed?.length || 0;
    if (col === 'totalCost') return `$${((item.laborHours || 0) * 40 + (item.partsUsed?.reduce((acc, pid) => acc + (spareParts.find(p => p.id === pid)?.unitCost || 0), 0) || 0))}`;
    return item[col];
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statistical Drill-Down</p>
            <h2 className="text-xl font-black text-slate-900 mt-1">{label} Breakdown</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {columns.map(c => (
                  <th key={c} className="py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {c.replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  {columns.map(c => (
                    <td key={c} className="py-3 text-xs font-bold text-slate-700">
                      {getVal(item, c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Items Identified: {data.length}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Technician Workload ───────────────────────────────────────────────────────

function TechnicianWorkload({ wos }) {
  const techs = ['Ahmed K.', 'Sara M.', 'Omar F.'];
  const data = techs.map(t => ({
    name: t,
    count: wos.filter(w => w.assignedTo === t && w.status !== 'Completed').length
  }));
  const max = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm print:hidden">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <UserCheck className="w-3.5 h-3.5 text-teal-600" /> Technician Current Workload
      </h3>
      <div className="space-y-4">
        {data.map(d => (
          <div key={d.name} className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{d.name}</span>
              <span>{d.count} Open</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 transition-all duration-500"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Toast Notification ──────────────────────────────────────────────────────

function Toast({ message, visible }) {
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
      <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

// ─── Slide-in Equipment Panel ──────────────────────────────────────────────────

function EquipmentDetailPanel({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { e.key === 'Escape' && onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!item) return null;

  const eqData = equipment.find(e => e.name === item.equipment);

  // ─── Academic Replacement Score Logic ──────────────────────────────────────
  const calculateReplacementScore = () => {
    if (!eqData) return 0;
    const currentYear = 2026;
    const purchaseYear = parseInt(eqData.purchaseDate.split('-')[0]);
    const age = currentYear - purchaseYear;
    
    // Factors: Age (weight 30), Reliability (weight 40), Repair Count (weight 30)
    const ageFactor = Math.min((age / 12) * 30, 30); // 12 years assumed life
    const reliabilityFactor = ((100 - eqData.availability) / 100) * 40;
    const repairFactor = Math.min((eqData.totalRepairs / 8) * 30, 30); // 8 repairs = critical
    
    return Math.round(ageFactor + reliabilityFactor + repairFactor);
  };

  const retirementScore = calculateReplacementScore();
  const getRetirementStatus = (score) => {
    if (score > 75) return { label: 'CRITICAL: REPLACE', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (score > 45) return { label: 'MONITOR: EVALUATE', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'HEALTHY: RETAIN', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
  };
  const status = getRetirementStatus(retirementScore);

  // Lecture Concept: Next Failure Predictor
  const monthsUntilFailure = eqData ? Math.round(eqData.mtbf * 0.8) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden print:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{eqData?.name || item.equipment}</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">#{eqData?.id || 'N/A'} • {eqData?.department || item.department}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Status Badge */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-inner">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Current Status</span>
              <span className={`text-sm font-bold mt-1 ${eqData?.status === 'Operational' ? 'text-green-600' : 'text-amber-600'}`}>
                {eqData?.status || 'Active'}
              </span>
            </div>
            <Activity className={`w-8 h-8 ${eqData?.status === 'Operational' ? 'text-green-500' : 'text-amber-500'}`} />
          </div>

          {/* Asset Identification Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" /> Asset Identification
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Fingerprint className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-medium text-slate-500">Serial Number</span>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900">{eqData?.serialNumber || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <Boxes className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-medium text-slate-500">Model / Mfg</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{eqData?.model} • {eqData?.manufacturer}</span>
              </div>
            </div>
          </div>

          {/* Maintenance Cost Estimator (Connect to Inventory) */}
          {item.id?.startsWith('WO-') && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Coins className="w-3.5 h-3.5" /> Service Financials (Estimated)
              </h4>
              <div className="bg-purple-50/50 rounded-xl p-5 border border-purple-100 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Labor ({item.laborHours || 0} hrs @ $40/hr)</span>
                  <span className="font-bold text-slate-900">${(item.laborHours || 0) * 40}</span>
                </div>

                {item.partsUsed?.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-purple-100">
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Spare Parts Used</span>
                    {item.partsUsed.map(pid => {
                      const part = spareParts.find(p => p.id === pid);
                      return (
                        <div key={pid} className="flex justify-between items-center text-xs">
                          <span className="text-slate-600 flex items-center gap-1.5">
                            <Package className="w-3 h-3" /> {part?.name || pid}
                          </span>
                          <span className="font-bold text-slate-900">${part?.unitCost || 0}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-3 border-t border-purple-300 flex justify-between items-center">
                  <span className="text-sm font-black text-purple-900">Total Repair Cost</span>
                  <span className="text-lg font-black text-purple-600">
                    ${((item.laborHours || 0) * 40 + (item.partsUsed?.reduce((acc, pid) => acc + (spareParts.find(p => p.id === pid)?.unitCost || 0), 0) || 0))}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Academic View: Reliability Predictor */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
            <TrendingDown className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-900 uppercase tracking-tight">Predictive Maintenance Alert</p>
              <p className="text-xs text-red-800/80 mt-1">
                Based on MTBF of <span className="font-bold">{eqData?.mtbf}</span> months, the next failure is statistically predicted in <span className="font-bold underline">~{monthsUntilFailure} months</span>.
              </p>
            </div>
          </div>

          {/* Lifecycle Summary Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Lifecycle Summary
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase">Purchased</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{eqData?.purchaseDate || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <WrenchIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase">Repairs</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{eqData?.totalRepairs || 0} Total Fixes</span>
              </div>
            </div>
          </div>

          {/* Retirement Predictor (Replacement Score) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Timer className="w-3.5 h-3.5" /> Retirement Analysis
            </h4>
            <div className={`${status.bg} ${status.border} border rounded-2xl p-5 shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${status.color}`}>Replacement Score</span>
                <span className={`text-xl font-black ${status.color}`}>{retirementScore}%</span>
              </div>
              <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden mb-4 border border-black/5">
                <div 
                  className={`h-full transition-all duration-1000 ${retirementScore > 70 ? 'bg-red-500' : retirementScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${retirementScore}%` }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Shield className={`w-4 h-4 ${status.color}`} />
                <span className={`text-xs font-black uppercase tracking-tight ${status.color}`}>{status.label}</span>
              </div>
              <p className="text-[10px] text-slate-600 mt-2 leading-relaxed italic">
                *Score calculated based on equipment age ({2026 - parseInt(eqData?.purchaseDate?.split('-')[0]) || 0} yrs), 
                cumulative failure rate, and total repair frequency.
              </p>
            </div>
          </div>

          {/* Core Stats */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5" /> Reliability Metrics
            </h4>

            {/* Availability */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-700">System Availability</span>
                <span className="text-lg font-bold text-teal-600">{eqData?.availability || 0}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-1000"
                  style={{ width: `${eqData?.availability || 0}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Failure Rate (λ)</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{eqData?.failureRate || '0.00'}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-500 uppercase font-bold">MTBF (Months)</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{eqData?.mtbf || '0.0'}</p>
              </div>
            </div>
          </div>

          {/* Maintenance Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Service Details
            </h4>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-900">Maintenance Level</p>
                  <p className="text-sm text-blue-800 mt-0.5">{eqData?.maintenanceLevel || 'Level 1'} Classification</p>
                </div>
              </div>

              {/* Warranty Feature */}
              <div className="bg-teal-50/50 rounded-xl p-4 border border-teal-100 flex items-start gap-3">
                <div className="p-2 bg-teal-100 rounded-lg shrink-0">
                  <Timer className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-900">Warranty / SLA Status</p>
                  <p className="text-sm text-teal-800 mt-0.5">Manufacturer Warranty Active</p>
                  <p className="text-[10px] text-teal-700/70 mt-1">Valid until: 24 Sep 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Entry Modal ──────────────────────────────────────────────────────────

function AddEntryModal({ isOpen, onClose, onAdd, equipmentList }) {
  const [type, setType] = useState('workorder'); // 'workorder' or 'ipm'
  const [formData, setFormData] = useState({
    equipment: '',
    priority: 'Medium',
    woType: 'Corrective',
    frequency: 'Monthly',
    assignedTo: 'Ahmed K.',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.equipment) return alert('Please select equipment');

    const selectedEq = equipmentList.find(e => e.name === formData.equipment);

    if (type === 'workorder') {
      const newWO = {
        id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
        equipment: formData.equipment,
        department: selectedEq?.department || 'General',
        type: formData.woType,
        priority: formData.priority,
        status: 'Pending',
        dateReported: new Date().toISOString().split('T')[0],
        assignedTo: formData.assignedTo,
        daysOpen: 0
      };
      onAdd('workorder', newWO);
    } else {
      const newIPM = {
        id: `IPM-${Math.floor(1000 + Math.random() * 9000)}`,
        equipment: formData.equipment,
        department: selectedEq?.department || 'General',
        frequency: formData.frequency,
        lastDone: 'Never',
        nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Upcoming',
        assignedTo: formData.assignedTo
      };
      onAdd('ipm', newIPM);
    }
    onClose();
    setFormData({ equipment: '', priority: 'Medium', woType: 'Corrective', frequency: 'Monthly', assignedTo: 'Ahmed K.' });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Create Maintenance Entry</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Toggle Type */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setType('workorder')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'workorder' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500'}`}
            >
              Work Order
            </button>
            <button
              type="button"
              onClick={() => setType('ipm')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'ipm' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500'}`}
            >
              IPM Task
            </button>
          </div>

          {/* Equipment Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Equipment</label>
            <select
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            >
              <option value="">Select Equipment...</option>
              {equipmentList.map(eq => <option key={eq.id} value={eq.name}>{eq.name} ({eq.department})</option>)}
            </select>
          </div>

          {type === 'workorder' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-teal-500 outline-none"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type</label>
                <select
                  value={formData.woType}
                  onChange={(e) => setFormData({ ...formData, woType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:border-teal-500 outline-none"
                >
                  <option>Corrective</option>
                  <option>Preventive (PM)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500 outline-none"
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Semi-Annual</option>
                <option>Annual</option>
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assign To</label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-teal-500 outline-none"
            >
              <option>Ahmed K.</option>
              <option>Sara M.</option>
              <option>Omar F.</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-200 mt-2 cursor-pointer"
          >
            Create {type === 'workorder' ? 'Work Order' : 'IPM Task'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Edit Entry Modal ────────────────────────────────────────────────────────

function EditEntryModal({ isOpen, onClose, onUpdate, item, equipmentList }) {
  const [formData, setFormData] = useState({
    equipment: '',
    department: '',
    type: '',
    priority: '',
    assignedTo: '',
    laborHours: 0
  });

  useEffect(() => {
    if (item) {
      setFormData({
        equipment: item.equipment || '',
        department: item.department || '',
        type: item.type || '',
        priority: item.priority || '',
        assignedTo: item.assignedTo || '',
        laborHours: item.laborHours || 0
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...item, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Pencil className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Edit {item.id}</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technician</label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="Ahmed K.">Ahmed K.</option>
              <option value="Sara M.">Sara M.</option>
              <option value="Omar F.">Omar F.</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Labor Hours</label>
              <input
                type="number"
                value={formData.laborHours}
                onChange={(e) => setFormData({...formData, laborHours: parseFloat(e.target.value)})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm mt-4 hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Print Options Modal ──────────────────────────────────────────────────────

function PrintOptionsModal({ isOpen, onClose, onConfirm, equipmentList }) {
  const [option, setOption] = useState('all'); // 'all', 'specific', 'one'
  const [selectedIds, setSelectedIds] = useState([]);
  const [oneId, setOneId] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    let toPrint = [];
    if (option === 'all') {
      toPrint = equipmentList;
    } else if (option === 'specific') {
      toPrint = equipmentList.filter(e => selectedIds.includes(e.id.toString()));
    } else if (option === 'one') {
      toPrint = equipmentList.filter(e => e.id.toString() === oneId);
    }

    if (toPrint.length === 0) return alert('No devices selected');
    onConfirm(toPrint);
    onClose();
  };

  const toggleId = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Printer className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Print Asset Report</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'all', label: 'All Devices', icon: Boxes },
              { id: 'specific', label: 'Specific IDs', icon: Hash },
              { id: 'one', label: 'One Device', icon: FileText }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setOption(opt.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 cursor-pointer ${option === opt.id ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                  }`}
              >
                <opt.icon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {option === 'all' && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                <p className="text-sm text-blue-700 font-medium">Full inventory report will be generated ({equipmentList.length} items).</p>
              </div>
            )}

            {option === 'specific' && (
              <div className="grid grid-cols-2 gap-2">
                {equipmentList.map(eq => (
                  <button
                    key={eq.id}
                    onClick={() => toggleId(eq.id.toString())}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${selectedIds.includes(eq.id.toString()) ? 'bg-teal-600 border-teal-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <div className={`p-1 rounded-md ${selectedIds.includes(eq.id.toString()) ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                      {selectedIds.includes(eq.id.toString()) ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 border border-slate-200 rounded" />}
                    </div>
                    <span className="text-xs font-bold truncate">{eq.name}</span>
                  </button>
                ))}
              </div>
            )}

            {option === 'one' && (
              <select
                value={oneId}
                onChange={(e) => setOneId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="">Select a device...</option>
                {equipmentList.map(eq => <option key={eq.id} value={eq.id}>{eq.name} (#{eq.serialNumber})</option>)}
              </select>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <button
            onClick={handleConfirm}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg cursor-pointer"
          >
            Generate & Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Professional Printable Report ───────────────────────────────────────────

function PrintableReport({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-12 text-slate-900 overflow-visible">
      {/* Hospital Header */}
      <div className="flex justify-between items-start border-b-4 border-slate-900 pb-8 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">City General Hospital</h1>
          <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">Clinical Engineering Department</p>
          <div className="flex gap-4 mt-4 text-[10px] font-bold text-slate-400">
            <span>Asset Management System</span>
            <span>•</span>
            <span>Quality Assurance Division</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Report Generated On</p>
          <p className="text-sm font-black mt-1">{new Date().toLocaleString()}</p>
          <div className="bg-slate-900 text-white px-4 py-1.5 rounded-md mt-4 inline-block text-[10px] font-black uppercase tracking-widest">
            OFFICIAL RECORD
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Type</p>
            <h2 className="text-xl font-black mt-1">Medical Device Inventory & Reliability Report</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Items</p>
            <p className="text-xl font-black mt-1">{data.length}</p>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-900">
              <th className="py-4 text-[10px] font-black uppercase tracking-widest">Asset Tag / Serial</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest">Equipment Details</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Availability</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">MTBF (m)</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Repairs</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest">Maintenance Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eq) => (
              <tr key={eq.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 pr-4">
                  <div className="text-xs font-black">#{eq.id}</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1">{eq.serialNumber}</div>
                </td>
                <td className="py-4">
                  <div className="text-xs font-black">{eq.name}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-1">{eq.manufacturer} • {eq.model}</div>
                  <div className="text-[9px] font-bold text-slate-400 mt-0.5">{eq.department} Department</div>
                </td>
                <td className="py-4 text-center">
                  <div className="text-xs font-black">{eq.availability}%</div>
                </td>
                <td className="py-4 text-center">
                  <div className="text-xs font-black">{eq.mtbf}</div>
                </td>
                <td className="py-4 text-center">
                  <div className="text-xs font-black">{eq.totalRepairs}</div>
                </td>
                <td className="py-4">
                  <span className="text-[9px] font-black px-2 py-1 bg-slate-100 rounded-md uppercase tracking-tight">
                    {eq.maintenanceLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-end">
          <div className="max-w-md">
            <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
              This report contains certified data from the clinical engineering asset management system.
              The information provided is based on the most recent service history and maintenance logs.
            </p>
          </div>
          <div className="text-right">
            <div className="w-48 h-12 border-b border-slate-400 mb-2"></div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Work Orders Tab ──────────────────────────────────────────────────────────

function WorkOrdersTab({ data, onSelectEquipment, onComplete, onEdit }) {
  const open = data.filter(wo => ['In Progress', 'Pending'].includes(wo.status)).length;
  const completed = data.filter(wo => wo.status === 'Completed').length;
  const scheduled = data.filter(wo => wo.status === 'Scheduled').length;

  function rowClass(wo) {
    if (wo.status === 'Completed') return 'bg-slate-50';
    if (wo.daysOpen > 7) return 'bg-red-50';
    return 'bg-white hover:bg-teal-50 transition-colors';
  }

  function textMuted(wo) {
    return wo.status === 'Completed' ? 'text-slate-400' : 'text-slate-700';
  }

  return (
    <div className="space-y-4">
      {/* Summary pills */}
      <div className="flex flex-wrap items-center gap-2">
        <SummaryPill icon={AlertTriangle} label="Open" count={open} colorClass="bg-red-100 text-red-700" />
        <SummaryPill icon={CheckCircle2} label="Completed" count={completed} colorClass="bg-green-100 text-green-700" />
        <SummaryPill icon={Clock} label="Scheduled" count={scheduled} colorClass="bg-blue-100 text-blue-700" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-medium">Work Order ID</th>
                <th className="px-4 py-3 text-left font-medium">Equipment</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Priority</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Date Reported</th>
                <th className="px-4 py-3 text-left font-medium">Assigned To</th>
                <th className="px-4 py-3 text-right font-medium">Days Open</th>
                <th className="px-4 py-3 text-center font-medium print:hidden">Complete</th>
                <th className="px-4 py-3 text-center font-medium print:hidden">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((wo) => (
                <tr key={wo.id} className={rowClass(wo)}>
                  <td className={`px-4 py-3 font-mono text-xs ${wo.status === 'Completed' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {wo.id}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelectEquipment(wo)}
                      className={`text-left font-semibold hover:text-teal-600 transition-colors underline decoration-slate-300 underline-offset-4 cursor-pointer ${wo.status === 'Completed' ? 'text-slate-400' : 'text-slate-900'}`}
                    >
                      {wo.equipment}
                    </button>
                  </td>
                  <td className={`px-4 py-3 ${textMuted(wo)}`}>{wo.department}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${wo.status === 'Completed' ? 'bg-slate-100 text-slate-400' : woTypeBadge[wo.type]}`}>
                      {wo.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${wo.status === 'Completed' ? 'bg-slate-100 text-slate-400' : woPriorityBadge[wo.priority]}`}>
                      {wo.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${woStatusBadge[wo.status]}`}>
                      {wo.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${textMuted(wo)}`}>{wo.dateReported}</td>
                  <td className={`px-4 py-3 ${textMuted(wo)}`}>{wo.assignedTo}</td>
                  <td className="px-4 py-3 text-right">
                    {wo.daysOpen === 0 ? (
                      <span className="text-slate-400">—</span>
                    ) : wo.daysOpen > 7 ? (
                      <span className="font-bold text-red-600">⚠️ {wo.daysOpen}</span>
                    ) : (
                      <span className="text-slate-700">{wo.daysOpen}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center print:hidden">
                    {wo.status !== 'Completed' && (
                      <button
                        onClick={() => onComplete(wo.id)}
                        className="p-1.5 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all cursor-pointer"
                        title="Mark as Completed"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center print:hidden">
                    <button
                      onClick={() => onEdit(wo)}
                      className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                      title="Edit Details"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note card */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <span className="text-amber-500 mt-0.5 shrink-0">⏱️</span>
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Program Indicator Alert:</span> Work orders open for more than 30 days should be flagged for escalation. Repairs not completed within 30 days are tracked as a key internal performance indicator per the Clinical Engineering Program.
        </p>
      </div>
    </div>
  );
}

// ─── IPM Schedule Tab ─────────────────────────────────────────────────────────

function IPMScheduleTab({ data, onSelectEquipment }) {
  const overdue = data.filter(i => i.status === 'Overdue').length;
  const upcoming = data.filter(i => i.status === 'Upcoming').length;
  const completed = data.filter(i => i.status === 'Completed').length;

  function rowClass(ipm) {
    if (ipm.status === 'Overdue') return 'bg-red-50 border-l-4 border-l-red-500';
    if (ipm.status === 'Completed') return 'bg-slate-50';
    return 'bg-white hover:bg-teal-50 transition-colors';
  }

  function textClass(ipm) {
    return ipm.status === 'Completed' ? 'text-slate-400' : 'text-slate-700';
  }

  return (
    <div className="space-y-4">
      {/* Summary pills */}
      <div className="flex flex-wrap items-center gap-2">
        <SummaryPill icon={AlertTriangle} label="Overdue" count={overdue} colorClass="bg-red-100 text-red-700" />
        <SummaryPill icon={Clock} label="Upcoming" count={upcoming} colorClass="bg-blue-100 text-blue-700" />
        <SummaryPill icon={CheckCircle2} label="Completed" count={completed} colorClass="bg-green-100 text-green-700" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="px-4 py-3 text-left font-medium">IPM ID</th>
                <th className="px-4 py-3 text-left font-medium">Equipment</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Frequency</th>
                <th className="px-4 py-3 text-left font-medium">Last Completed</th>
                <th className="px-4 py-3 text-left font-medium">Next Due</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((ipm) => (
                <tr key={ipm.id} className={rowClass(ipm)}>
                  <td className={`px-4 py-3 font-mono text-xs ${ipm.status === 'Completed' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {ipm.id}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelectEquipment(ipm)}
                      className={`text-left font-semibold hover:text-teal-600 transition-colors underline decoration-slate-300 underline-offset-4 cursor-pointer ${ipm.status === 'Completed' ? 'text-slate-400' : 'text-slate-900'}`}
                    >
                      {ipm.equipment}
                    </button>
                  </td>
                  <td className={`px-4 py-3 ${textClass(ipm)}`}>{ipm.department}</td>
                  <td className={`px-4 py-3 ${textClass(ipm)}`}>{ipm.frequency}</td>
                  <td className={`px-4 py-3 ${textClass(ipm)}`}>{ipm.lastDone}</td>
                  <td className={`px-4 py-3 font-medium ${ipm.status === 'Overdue' ? 'text-red-700' : textClass(ipm)}`}>
                    {ipm.nextDue}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${ipmStatusBadge[ipm.status]}`}>
                      {ipm.status}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${textClass(ipm)}`}>{ipm.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left — About IPM */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-teal-900 mb-2">📋 About IPM Procedures</h4>
          <p className="text-sm text-teal-800 leading-relaxed">
            Scheduled Inspection and Preventive Maintenance (IPM) ensures equipment safety and performance. Completion of scheduled IPMs within the period is a key program indicator monitored by the Clinical Engineering department.
          </p>
        </div>

        {/* Right — IPM Rate progress */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-slate-800 mb-3">📊 This Month's IPM Rate</h4>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-slate-500 font-medium">78% IPM Completion Rate</span>
            <span className="text-xs font-bold text-teal-700">78%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-teal-500 transition-all duration-700"
              style={{ width: '78%' }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">6 of 8 scheduled IPMs completed this period.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MaintenanceManagement() {
  const [activeTab, setActiveTab] = useState('workorders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printData, setPrintData] = useState([]);
  const [kpiDetail, setKpiDetail] = useState(null);

  // Local state for interactive data
  const [wos, setWos] = useState(initialWorkOrders);
  const [ipms, setIpms] = useState(initialIPMSchedule);
  const [toastMsg, setToastMsg] = useState('');

  // Handle Work Order Completion
  const completeWO = (id) => {
    setWos(prev => prev.map(w => w.id === id ? { ...w, status: 'Completed', daysOpen: 0 } : w));
    setToastMsg(`Work Order ${id} successfully completed!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Handle Adding New Entries
  const handleAddEntry = (type, data) => {
    if (type === 'workorder') {
      setWos(prev => [data, ...prev]);
      setToastMsg(`New Work Order ${data.id} created!`);
    } else {
      setIpms(prev => [data, ...prev]);
      setToastMsg(`New IPM Task ${data.id} scheduled!`);
    }
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Handle Updating Entries
  const handleUpdateEntry = (updatedData) => {
    setWos(prev => prev.map(w => w.id === updatedData.id ? updatedData : w));
    setToastMsg(`Work Order ${updatedData.id} updated successfully!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Trigger Print with specific data
  const triggerPrint = (data) => {
    setPrintData(data);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Filter Work Orders
  const filteredWorkOrders = wos.filter(wo => {
    const matchesSearch = wo.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || wo.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || wo.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Filter IPM Schedule
  const filteredIPM = ipms.filter(ipm => {
    return ipm.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipm.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-20">
      {/* 0 — KPI Strip */}
      <KPIStrip
        wos={wos}
        ipms={ipms}
        onMetricClick={(type, label) => setKpiDetail({ type, label })}
      />

      {/* A — Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-7 h-7 text-teal-600" />
            Maintenance Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Work orders, IPM scheduling, and equipment reliability tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Create New Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 cursor-pointer print:hidden"
          >
            <Plus className="w-4 h-4" />
            Create New
          </button>

          {/* Print Button */}
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer print:hidden"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>

          {/* Live Search */}
          <div className="relative w-full md:w-64 print:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search equipment or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-6">
          {/* B — Maintenance Levels Info Card */}
          <MaintenanceLevelsCard />

          {/* C — Controls & Tabs */}
          <div className="flex flex-col space-y-4 print:hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
                <button
                  onClick={() => setActiveTab('workorders')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeTab === 'workorders'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  <Wrench className="w-4 h-4" />
                  Work Orders
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeTab === 'workorders' ? 'bg-teal-100' : 'bg-slate-200'}`}>
                    {filteredWorkOrders.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('ipm')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${activeTab === 'ipm'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                  <CalendarClock className="w-4 h-4" />
                  IPM Schedule
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${activeTab === 'ipm' ? 'bg-teal-100' : 'bg-slate-200'}`}>
                    {filteredIPM.length}
                  </span>
                </button>
              </div>

              {/* Quick Filters for Work Orders */}
              {activeTab === 'workorders' && (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-xs font-semibold bg-white border border-slate-200 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Pending">Pending</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority:</span>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="text-xs font-semibold bg-white border border-slate-200 px-2 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
                    >
                      <option value="All">All Priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* D — Tab Content */}
          <div className="relative">
            {activeTab === 'workorders' ? (
              <WorkOrdersTab
                data={filteredWorkOrders}
                onSelectEquipment={setSelectedItem}
                onComplete={completeWO}
                onEdit={(item) => { setEditingItem(item); setIsEditModalOpen(true); }}
              />
            ) : (
              <IPMScheduleTab
                data={filteredIPM}
                onSelectEquipment={setSelectedItem}
              />
            )}
          </div>
        </div>

        {/* E — Footer Stats & Workload */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TechnicianWorkload wos={wos} />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm print:hidden">
            <h4 className="text-[10px] uppercase font-bold text-amber-600 tracking-widest mb-2">Lecture Note</h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Medical equipment repair costs should ideally not exceed 25% of the equipment's original acquisition cost per year. High λ (failure rate) devices are prime candidates for replacement.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <EquipmentDetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
      <AddEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEntry}
        equipmentList={equipment}
      />
      <EditEntryModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateEntry}
        item={editingItem}
        equipmentList={equipment}
      />
      <PrintOptionsModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onConfirm={triggerPrint}
        equipmentList={equipment}
      />
      <KPIDetailModal
        selection={kpiDetail}
        onClose={() => setKpiDetail(null)}
        wos={wos}
        ipms={ipms}
        equipmentList={equipment}
      />
      <Toast message={toastMsg} visible={!!toastMsg} />

      {/* Hidden Professional Report for Print */}
      <PrintableReport data={printData} />

      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .shadow-sm, .shadow-xl, .shadow-2xl { shadow: none !important; }
          table { border-collapse: collapse !important; }
          th, td { border: 1px solid #e2e8f0 !important; }
        }
      `}</style>
    </div>
  );
}
