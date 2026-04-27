import { equipment } from '../data/mockData';

const statusColors = {
  'Operational': 'bg-green-100 text-green-700',
  'Under Maintenance': 'bg-amber-100 text-amber-700',
  'Out of Service': 'bg-red-100 text-red-700',
};

const statusDotColors = {
  'Operational': 'bg-green-500',
  'Under Maintenance': 'bg-amber-500',
  'Out of Service': 'bg-red-500',
};

function getValueColor(value) {
  if (value >= 90) return 'text-green-600 font-semibold';
  if (value >= 75) return 'text-amber-600 font-semibold';
  return 'text-red-600 font-semibold';
}

const operational = equipment.filter(e => e.status === 'Operational').length;
const underMaintenance = equipment.filter(e => e.status === 'Under Maintenance').length;
const outOfService = equipment.filter(e => e.status === 'Out of Service').length;

const formulas = [
  { label: 'Availability', formula: 'Availability = UpTime / LoadingTime × 100%' },
  { label: 'Performance Efficiency', formula: 'Performance Efficiency = OperatingTime / UpTime × 100%' },
  { label: 'Failure Rate', formula: 'Failure Rate (λ) = DownTime / LoadingTime   [per month]' },
  { label: 'MTBF', formula: 'MTBF = 1 / λ   [months]' },
  { label: 'UpTime', formula: 'UpTime = OperatingTime + StandbyTime' },
];

export default function EquipmentInventory() {
  return (
    <div className="space-y-6">
      {/* Section A — Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Equipment Inventory</h1>
        <p className="text-sm text-slate-500 mt-1">
          Medical equipment efficiency indicators — Loading Time: 720 hrs/month
        </p>
        <div className="flex items-center gap-3 mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-green-100 text-green-700">
            <span className={`w-2 h-2 rounded-full ${statusDotColors['Operational']}`}></span>
            {operational} Operational
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
            <span className={`w-2 h-2 rounded-full ${statusDotColors['Under Maintenance']}`}></span>
            {underMaintenance} Under Maintenance
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-red-100 text-red-700">
            <span className={`w-2 h-2 rounded-full ${statusDotColors['Out of Service']}`}></span>
            {outOfService} Out of Service
          </span>
        </div>
      </div>

      {/* Section B — Formulas Reference Card */}
      <div className="bg-slate-900 text-white rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">📐 Efficiency Indicator Formulas (SBEG202 Lecture)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {formulas.map((f, i) => (
            <div key={i} className="border-l-2 border-teal-400 pl-4 py-1">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{f.label}</p>
              <p className="font-mono text-teal-300 text-sm">{f.formula}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section C — Equipment Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3 text-left font-medium">#</th>
                <th className="px-4 py-3 text-left font-medium">Equipment</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Up Time (h)</th>
                <th className="px-4 py-3 text-right font-medium">Down Time (h)</th>
                <th className="px-4 py-3 text-right font-medium">Op. Time (h)</th>
                <th className="px-4 py-3 text-right font-medium">Availability %</th>
                <th className="px-4 py-3 text-right font-medium">Perf. Eff. %</th>
                <th className="px-4 py-3 text-right font-medium">λ (/mo)</th>
                <th className="px-4 py-3 text-right font-medium">MTBF (mo)</th>
                <th className="px-4 py-3 text-left font-medium">Maintenance Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equipment.map((eq, idx) => (
                <tr
                  key={eq.id}
                  className={`hover:bg-teal-50 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/50' : ''}`}
                >
                  <td className="px-4 py-3 text-slate-500">{eq.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{eq.name}</td>
                  <td className="px-4 py-3 text-slate-600">{eq.department}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[eq.status]}`}>
                      {eq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-700">{eq.upTime}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{eq.downTime}</td>
                  <td className="px-4 py-3 text-right text-slate-700">{eq.operatingTime}</td>
                  <td className={`px-4 py-3 text-right ${getValueColor(eq.availability)}`}>
                    {eq.availability}%
                  </td>
                  <td className={`px-4 py-3 text-right ${getValueColor(eq.performanceEfficiency)}`}>
                    {eq.performanceEfficiency}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-700">{eq.failureRate}</td>
                  <td className="px-4 py-3 text-right font-mono text-slate-700">{eq.mtbf}</td>
                  <td className="px-4 py-3 text-slate-600">{eq.maintenanceLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
