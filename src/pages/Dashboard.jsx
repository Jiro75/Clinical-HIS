import { kpiSummary, equipment, workOrders } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine,
  ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts';
import { Monitor, Activity, Clock, Wrench, CheckSquare } from 'lucide-react';

/* ── Derived data ─────────────────────────────────────────────── */

const availabilityData = equipment.map(eq => ({
  name: eq.name
    .replace('Machine', '')
    .replace('Scanner', '')
    .replace('Monitor', 'Mon.')
    .replace('Refrigerator', 'Fridge')
    .replace('Analyzer', 'Anlz.')
    .replace('Incubator', 'Incub.')
    .replace('Lithotripter', 'Litho.')
    .replace('Microscope', 'Micro.')
    .replace('Electrosurgical', 'ESU')
    .trim()
    .slice(0, 12),
  availability: eq.availability,
  fill:
    eq.availability >= 90
      ? '#16A34A'
      : eq.availability >= 75
        ? '#D97706'
        : '#DC2626',
}));

const statusData = [
  { name: 'Operational',       value: kpiSummary.operational,       color: '#16A34A' },
  { name: 'Under Maintenance', value: kpiSummary.underMaintenance,  color: '#D97706' },
  { name: 'Out of Service',    value: kpiSummary.outOfService,      color: '#DC2626' },
];

const mtbfData = equipment.map(eq => ({
  name: eq.name
    .replace('Machine', '')
    .replace('Scanner', '')
    .replace('Monitor', 'Mon.')
    .replace('Refrigerator', 'Fridge')
    .replace('Analyzer', 'Anlz.')
    .replace('Incubator', 'Incub.')
    .replace('Lithotripter', 'Litho.')
    .replace('Microscope', 'Micro.')
    .replace('Electrosurgical', 'ESU')
    .trim()
    .slice(0, 12),
  mtbf: eq.mtbf,
}));

const openOrders = workOrders.filter(wo =>
  ['In Progress', 'Pending'].includes(wo.status),
);

/* ── KPI card definitions ─────────────────────────────────────── */

const kpiCards = [
  {
    value: kpiSummary.totalEquipment,
    label: 'Total Equipment',
    Icon: Monitor,
    borderColor: 'border-l-blue-500',
    iconColor: 'text-blue-500',
  },
  {
    value: `${kpiSummary.avgAvailability}%`,
    label: 'Avg. Availability',
    Icon: Activity,
    borderColor: 'border-l-green-500',
    iconColor: 'text-green-500',
  },
  {
    value: `${kpiSummary.avgMTBF} mo`,
    label: 'Avg. MTBF',
    Icon: Clock,
    borderColor: 'border-l-teal-500',
    iconColor: 'text-teal-500',
  },
  {
    value: kpiSummary.openWorkOrders,
    label: 'Open Work Orders',
    Icon: Wrench,
    borderColor: 'border-l-amber-500',
    iconColor: 'text-amber-500',
  },
  {
    value: `${kpiSummary.ipmCompletionRate}%`,
    label: 'IPM Completion Rate',
    Icon: CheckSquare,
    borderColor: 'border-l-purple-500',
    iconColor: 'text-purple-500',
  },
];

/* ── Priority & status badge helpers ──────────────────────────── */

const priorityBadge = {
  High:   'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low:    'bg-slate-100 text-slate-600',
};

const statusBadge = {
  'In Progress': 'bg-blue-100 text-blue-700',
  Pending:       'bg-amber-100 text-amber-700',
};

/* ── Custom tooltip for availability chart ────────────────────── */
const AvailTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 shadow-lg rounded-lg px-4 py-3 text-sm">
      <p className="font-semibold text-slate-800">{d.name}</p>
      <p className="text-slate-600">
        Availability: <span className="font-bold" style={{ color: d.fill }}>{d.availability}%</span>
      </p>
    </div>
  );
};

/* ── Custom tooltip for MTBF chart ────────────────────────────── */
const MtbfTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 shadow-lg rounded-lg px-4 py-3 text-sm">
      <p className="font-semibold text-slate-800">{d.name}</p>
      <p className="text-slate-600">
        MTBF: <span className="font-bold text-teal-600">{d.mtbf} months</span>
      </p>
    </div>
  );
};

/* ── Dashboard page ───────────────────────────────────────────── */

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* ── A. Page Header ─────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Clinical Engineering Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Program performance indicators — April 2026
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-green-100 text-green-700">
          🟢 System Active
        </span>
      </div>

      {/* ── B. 5 KPI Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 border-l-4 ${card.borderColor} relative`}
          >
            <card.Icon
              className={`w-8 h-8 ${card.iconColor} absolute top-4 right-4 opacity-80`}
            />
            <p className="text-3xl font-bold text-slate-900">{card.value}</p>
            <p className="text-sm text-slate-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* ── Row 1: Availability Chart + Donut ──────────────────── */}
      <div className="grid grid-cols-5 gap-6">
        {/* C. Availability Bar Chart (3/5 = 60%) */}
        <div className="col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900">
            Equipment Availability (%)
          </h3>
          <p className="text-xs text-slate-500 mb-4">Target: 90%</p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={availabilityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#64748B' }}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip content={<AvailTooltip />} />
              <ReferenceLine
                y={90}
                stroke="#DC2626"
                strokeDasharray="6 4"
                label={{ value: '90% Target', position: 'insideTopRight', fill: '#DC2626', fontSize: 11 }}
              />
              <Bar dataKey="availability" radius={[4, 4, 0, 0]}>
                {availabilityData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* D. Equipment Status Donut (2/5 = 40%) */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900">
            Equipment Status Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                strokeWidth={0}
              >
                {statusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              {/* Center label */}
              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-slate-900"
                style={{ fontSize: 22, fontWeight: 700 }}
              >
                {kpiSummary.totalEquipment}
              </text>
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-slate-500"
                style={{ fontSize: 12 }}
              >
                Total
              </text>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Row 2: MTBF Chart + Work Orders Table ──────────────── */}
      <div className="grid grid-cols-5 gap-6">
        {/* E. MTBF Bar Chart (3/5 = 60%) */}
        <div className="col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-900">
            Mean Time Between Failures (months)
          </h3>
          <p className="text-xs text-slate-500 mb-4">Higher = better reliability</p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mtbfData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#64748B' }}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B' }}
                label={{ value: 'Months', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748B' } }}
              />
              <Tooltip content={<MtbfTooltip />} />
              <Bar dataKey="mtbf" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* F. Recent Work Orders Mini-Table (2/5 = 40%) */}
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-base font-semibold text-slate-900">
              Open Work Orders
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              {openOrders.length}
            </span>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="pb-2 pr-2 font-medium">WO ID</th>
                  <th className="pb-2 pr-2 font-medium">Equipment</th>
                  <th className="pb-2 pr-2 font-medium">Priority</th>
                  <th className="pb-2 pr-2 font-medium">Status</th>
                  <th className="pb-2 font-medium text-right">Days Open</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {openOrders.map(wo => (
                  <tr
                    key={wo.id}
                    className={`${wo.daysOpen > 7 ? 'bg-red-50' : ''} hover:bg-slate-50 transition-colors`}
                  >
                    <td className="py-2.5 pr-2 font-mono text-xs text-slate-700">{wo.id}</td>
                    <td className="py-2.5 pr-2 text-slate-700">{wo.equipment}</td>
                    <td className="py-2.5 pr-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityBadge[wo.priority]}`}>
                        {wo.priority}
                      </span>
                    </td>
                    <td className="py-2.5 pr-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusBadge[wo.status]}`}>
                        {wo.status}
                      </span>
                    </td>
                    <td className={`py-2.5 text-right font-medium ${wo.daysOpen > 7 ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
                      {wo.daysOpen}{wo.daysOpen > 7 && ' ⚠️'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-teal-600 font-medium mt-4 pt-3 border-t border-slate-100 cursor-pointer hover:text-teal-700 transition-colors">
            View all in Maintenance →
          </p>
        </div>
      </div>
    </div>
  );
}
