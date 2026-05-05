import { useState } from 'react';
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import { Calculator, Activity, AlertTriangle, CheckCircle, Clock, TrendingUp, Wrench, Shield } from 'lucide-react';
import { equipment, workOrders, kpiSummary } from '../data/mockData';

// ─── Data generators ──────────────────────────────────────────────────────────

function generateBathtubData() {
  const points = [];
  for (let t = 0; t <= 100; t += 2) {
    const earlyFailure = 2.5 * Math.exp(-0.08 * t);
    const baseline = 0.3;
    const wearOut = t > 70 ? 0.001 * Math.pow(t - 70, 2) : 0;
    points.push({ t, ht: parseFloat((earlyFailure + baseline + wearOut).toFixed(3)) });
  }
  return points;
}

function generateExponentialData() {
  const muValues = [20, 50, 100];
  const points = [];
  for (let t = 0; t <= 200; t += 5) {
    const point = { t };
    muValues.forEach(mu => {
      point[`mu${mu}`] = parseFloat(((1 / mu) * Math.exp(-t / mu)).toFixed(6));
    });
    points.push(point);
  }
  return points;
}

const bathtubData = generateBathtubData();
const expData = generateExponentialData();

// ─── Compute Program Indicators ───────────────────────────────────────────────

function computeProgramIndicators() {
  const ipmRate = kpiSummary.ipmCompletionRate;

  const completedWOs = workOrders.filter(wo => wo.status === 'Completed');
  const within24h = completedWOs.filter(wo => wo.daysOpen === 0);
  const repair24hRate = completedWOs.length > 0
    ? Math.round((within24h.length / completedWOs.length) * 100)
    : 0;

  const overdue7 = workOrders.filter(
    wo => wo.status !== 'Completed' && wo.daysOpen > 7
  ).length;

  const fleetAvailability = kpiSummary.avgAvailability;

  const completedCorrectiveEquipment = completedWOs
    .filter(wo => wo.type === 'Corrective')
    .map(wo => wo.equipment);

  const callbackWOs = workOrders.filter(
    wo =>
      wo.type === 'Corrective' &&
      wo.status !== 'Completed' &&
      completedCorrectiveEquipment.includes(wo.equipment)
  );
  const totalCorrective = workOrders.filter(wo => wo.type === 'Corrective').length;
  const callbackRate = totalCorrective > 0
    ? Math.round((callbackWOs.length / totalCorrective) * 100)
    : 0;

  const partsOverdue14 = workOrders.filter(
    wo =>
      wo.partsUsed && wo.partsUsed.length > 0 &&
      wo.status !== 'Completed' &&
      wo.daysOpen > 14
  ).length;

  return { ipmRate, repair24hRate, overdue7, fleetAvailability, callbackRate, partsOverdue14 };
}

const computed = computeProgramIndicators();

const programIndicators = [
  {
    id: 'ipm', label: 'IPM Completion Rate',
    value: computed.ipmRate, unit: '%', threshold: 90, target: 95,
    type: 'rate', direction: 'higher-is-better', icon: CheckCircle, color: 'teal',
    description: '% of scheduled Inspection & Preventive Maintenance completed on time',
    category: 'Internal Operations',
  },
  {
    id: 'repair_24h', label: 'Repairs Completed ≤ 24h',
    value: computed.repair24hRate, unit: '%', threshold: 75, target: 85,
    type: 'rate', direction: 'higher-is-better', icon: Clock, color: 'blue',
    description: '% of repair requests resolved within 24 hours',
    category: 'Quality Improvement',
  },
  {
    id: 'overdue_7', label: 'Repairs Overdue > 7 Days',
    value: computed.overdue7, unit: 'jobs', threshold: 3, target: 0,
    type: 'count', direction: 'lower-is-better', icon: AlertTriangle, color: 'amber',
    description: 'Number of open repair jobs not completed within 7 days',
    category: 'Internal Operations',
  },
  {
    id: 'availability', label: 'Fleet Availability',
    value: computed.fleetAvailability, unit: '%', threshold: 85, target: 95,
    type: 'rate', direction: 'higher-is-better', icon: Activity, color: 'green',
    description: 'Average UpTime / LoadingTime across all managed equipment',
    category: 'Internal Operations',
  },
  {
    id: 'callbacks', label: 'Repeat Repair Callbacks',
    value: computed.callbackRate, unit: '%', threshold: 10, target: 5,
    type: 'rate', direction: 'lower-is-better', icon: TrendingUp, color: 'red',
    description: '% of repairs that required re-intervention within the period',
    category: 'Quality Improvement',
  },
  {
    id: 'parts_14', label: 'Parts Orders > 14 Days',
    value: computed.partsOverdue14, unit: 'orders', threshold: 2, target: 0,
    type: 'count', direction: 'lower-is-better', icon: Wrench, color: 'purple',
    description: 'Number of pending parts orders outstanding for more than 14 days',
    category: 'Internal Operations',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const colorMap = {
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700', bar: '#0D9488' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700', bar: '#2563EB' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', bar: '#D97706' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700', bar: '#16A34A' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700', bar: '#DC2626' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700', bar: '#7C3AED' },
};

function getIndicatorStatus(ind) {
  if (ind.direction === 'higher-is-better') {
    if (ind.value >= ind.target) return { label: '✅ On Target', cls: 'bg-green-100 text-green-700' };
    if (ind.value >= ind.threshold) return { label: '⚠️ Below Target', cls: 'bg-amber-100 text-amber-700' };
    return { label: '🔴 Threshold Breached', cls: 'bg-red-100 text-red-700' };
  } else {
    if (ind.value <= ind.target) return { label: '✅ On Target', cls: 'bg-green-100 text-green-700' };
    if (ind.value <= ind.threshold) return { label: '⚠️ Near Threshold', cls: 'bg-amber-100 text-amber-700' };
    return { label: '🔴 Threshold Breached', cls: 'bg-red-100 text-red-700' };
  }
}

const getRiskLevel = (failureRate) => {
  if (failureRate > 0.15) return { label: 'High Risk', color: 'bg-red-100 text-red-700' };
  if (failureRate >= 0.05) return { label: 'Moderate Risk', color: 'bg-amber-100 text-amber-700' };
  return { label: 'Low Risk', color: 'bg-green-100 text-green-700' };
};

const getMaintenanceColor = (level) => {
  if (level === 'Organizational') return 'bg-blue-100 text-blue-700';
  if (level === 'Intermediate') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
};

const getMedalEmoji = (rank) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReliabilityAnalysis() {
  // FIX: store inputs as strings so the field stays editable while the user
  // is mid-typing (e.g. clearing to type a new number). We only parse to a
  // number at calculation time, falling back to 1 / 0 so no NaN propagates.
  const [muStr, setMuStr] = useState('8000');
  const [tStr, setTStr] = useState('7000');

  const mu = Math.max(1, parseFloat(muStr) || 1);
  const t = Math.max(0, parseFloat(tStr) || 0);

  const Ft = parseFloat((1 - Math.exp(-t / mu)).toFixed(4));
  const Rt = parseFloat((Math.exp(-t / mu)).toFixed(4));
  const Ht = parseFloat((1 / mu).toFixed(6));
  const mtbf = mu;

  const ranked = [...equipment].sort((a, b) => b.failureRate - a.failureRate);

  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reliability Analysis</h1>
          <p className="text-slate-500 mt-1">Lifetime distributions, hazard functions, and failure rate analysis</p>
        </div>
        <div className="bg-teal-100 text-teal-700 text-xs font-medium px-3 py-1 rounded-full">
          SBEG202 — Concept Application
        </div>
      </div>

      {/* ── Core Reliability Formulas ────────────────────────────────────────── */}
      <div className="bg-slate-900 text-white rounded-xl p-6">
        <h2 className="text-white font-semibold text-base mb-4">📐 Core Reliability Formulas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-2 border-teal-400 pl-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">F(t) — Cumulative Failure Distribution</div>
            <div className="font-mono text-teal-300 text-sm font-semibold">F(t) = ∫₀ᵗ f(t) dt = 1 − e^(−t/μ)</div>
            <div className="text-slate-400 text-xs mt-1">Probability the system fails between 0 and time t.</div>
          </div>
          <div className="border-l-2 border-teal-400 pl-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">R(t) — Reliability Function</div>
            <div className="font-mono text-teal-300 text-sm font-semibold">R(t) = 1 − F(t) = e^(−t/μ)</div>
            <div className="text-slate-400 text-xs mt-1">Probability the system is still functioning at time t.</div>
          </div>
          <div className="border-l-2 border-teal-400 pl-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">H(t) — Conditional Failure Rate (Hazard Function)</div>
            <div className="font-mono text-teal-300 text-sm font-semibold">H(t) = f(t) / R(t) = 1/μ (constant)</div>
            <div className="text-slate-400 text-xs mt-1">For exponential distribution: failure rate is independent of age.</div>
          </div>
          <div className="border-l-2 border-teal-400 pl-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">f(t) — Probability Density Function</div>
            <div className="font-mono text-teal-300 text-sm font-semibold">f(t) = (1/μ) · e^(−t/μ),  t ≥ 0</div>
            <div className="text-slate-400 text-xs mt-1">μ = mean time to failure (MTTF). Memoryless property.</div>
          </div>
        </div>
      </div>

      {/* ── Charts Row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Bathtub Curve */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Bathtub Curve — Conditional Failure Rate H(t)</h3>
          <p className="text-xs text-slate-400 mb-4">Three phases: early failure, useful life, and wear-out</p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={bathtubData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottomRight', offset: -5, fontSize: 11 }} tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'H(t)', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <ReferenceLine x={20} stroke="#16A34A" strokeDasharray="5 5" label={{ value: 'Useful Life →', position: 'top', fontSize: 10, fill: '#16A34A' }} />
              <ReferenceLine x={70} stroke="#DC2626" strokeDasharray="5 5" label={{ value: '← Wear-out', position: 'top', fontSize: 10, fill: '#DC2626' }} />
              <Line type="monotone" dataKey="ht" stroke="#0D9488" strokeWidth={2.5} dot={false} name="H(t)" />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-center">
            <div><div className="font-semibold text-red-600">🔴 Infant Mortality</div><div className="text-slate-500">t = 0–20</div></div>
            <div><div className="font-semibold text-green-600">🟢 Useful Life</div><div className="text-slate-500">t = 20–70</div></div>
            <div><div className="font-semibold text-red-600">🔴 Ageing</div><div className="text-slate-500">t = 70–100</div></div>
          </div>
        </div>

        {/* Exponential PDF */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-1">Exponential PDF — f(t) = (1/μ)·e^(−t/μ)</h3>
          <p className="text-xs text-slate-500 mb-4">Three equipment lifetime scenarios</p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={expData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="t" label={{ value: 'Time t (hours)', position: 'insideBottomRight', offset: -5, fontSize: 11 }} tick={{ fontSize: 11 }} />
              <YAxis label={{ value: 'f(t)', angle: -90, position: 'insideLeft', fontSize: 11 }} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="mu20" stroke="#DC2626" strokeWidth={2} dot={false} name="μ=20h (Short Life)" />
              <Line type="monotone" dataKey="mu50" stroke="#D97706" strokeWidth={2} dot={false} name="μ=50h (Medium Life)" />
              <Line type="monotone" dataKey="mu100" stroke="#16A34A" strokeWidth={2} dot={false} name="μ=100h (Long Life)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Interactive Calculator ───────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left column — Input Panel */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-900">Reliability Calculator</h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">Based on Exponential Distribution — f(t) = (1/μ)·e^(−t/μ)</p>

            {/* Input 1: μ */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                μ — Mean Time to Failure (MTTF)
              </label>
              <p className="text-xs text-slate-400 mb-2">Average time until equipment fails</p>
              <input
                type="number"
                value={muStr}
                onChange={(e) => setMuStr(e.target.value)}
                onBlur={(e) => {
                  const v = parseFloat(e.target.value);
                  setMuStr(String(isNaN(v) || v < 1 ? 1 : v));
                }}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Input 2: t */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                t — Time of Interest (hours)
              </label>
              <p className="text-xs text-slate-400 mb-2">The time point to evaluate reliability</p>
              <input
                type="number"
                value={tStr}
                onChange={(e) => setTStr(e.target.value)}
                onBlur={(e) => {
                  const v = parseFloat(e.target.value);
                  setTStr(String(isNaN(v) || v < 0 ? 0 : v));
                }}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Lecture example note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
              <div className="font-semibold mb-1">📖 Lecture Example: μ = 8000h, t = 7000h</div>
              <div>→ F(7000) = 1 − e^(−7000/8000) = 1 − e^(−0.875) ≈ 0.4908</div>
              <div>→ About 49% of bulbs fail before 7000 hours of use.</div>
            </div>
          </div>

          {/* Right column — Results Panel */}
          <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between">
            <h3 className="font-semibold text-white mb-6">Analysis Results</h3>

            {/* 2×2 result blocks */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className={`text-2xl font-bold font-mono ${Ft > 0.5 ? 'text-red-400' : 'text-green-400'}`}>
                  {(Ft * 100).toFixed(2)}%
                </div>
                <div className="text-xs text-slate-400 mt-1">F(t) = 1 − e^(−t/μ)</div>
                <div className="text-xs text-slate-500 mt-1">Failure Probability</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className={`text-2xl font-bold font-mono ${Rt >= 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                  {(Rt * 100).toFixed(2)}%
                </div>
                <div className="text-xs text-slate-400 mt-1">R(t) = e^(−t/μ)</div>
                <div className="text-xs text-slate-500 mt-1">Reliability</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold font-mono text-teal-400">
                  {Ht.toFixed(6)}
                </div>
                <div className="text-xs text-slate-400 mt-1">H(t) = 1/μ /h</div>
                <div className="text-xs text-slate-500 mt-1">Hazard Rate (constant)</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="text-2xl font-bold font-mono text-teal-400">
                  {mtbf.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">MTBF = μ (hours)</div>
                <div className="text-xs text-slate-500 mt-1">Mean Time to Failure</div>
              </div>
            </div>

            {/* Failure probability progress bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium">Failure Probability</div>
                <div className="font-mono text-sm">{(Ft * 100).toFixed(2)}%</div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${Ft > 0.5 ? 'bg-red-500' : 'bg-teal-500'}`}
                  style={{ width: `${Math.min(Ft * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Interpretation */}
            <div className="text-xs text-slate-300 p-3 bg-slate-800 rounded-lg">
              {Ft > 0.5
                ? `⚠️ More than half of similar equipment is expected to fail before t = ${t.toLocaleString()} hours.`
                : `✅ ${(Rt * 100).toFixed(1)}% of similar equipment is expected to still be operating at t = ${t.toLocaleString()} hours.`}
            </div>
          </div>

        </div>
      </div>

      {/* ── Program Indicators Section ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-900 text-base">Clinical Engineering Program Indicators</h3>
            </div>
            <p className="text-xs text-slate-500">
              Objective, quantifiable performance measurements — SBEG202 Lecture framework
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">Internal Operations</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">Quality Improvement</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">📋 Lecture Note: </span>
          Indicators span three areas: <strong>Internal Operations</strong> (IPM completion, overdue repairs),
          <strong> Quality Improvement</strong> (callbacks, 24h repair rate), and
          <strong> External Benchmarking</strong> (cost per repair, devices per bed).
          Multiple indicators are required — a single metric is never sufficient for verification.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {programIndicators.map((ind) => {
            const status = getIndicatorStatus(ind);
            const c = colorMap[ind.color];
            const Icon = ind.icon;
            const pct = ind.type === 'rate'
              ? Math.min(ind.value, 100)
              : Math.min((ind.value / (ind.threshold * 2)) * 100, 100);

            return (
              <div key={ind.id} className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${c.text}`} />
                    <span className="text-xs font-semibold text-slate-700">{ind.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.cls}`}>
                    {status.label}
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono ${c.text} mb-1`}>
                  {ind.value}<span className="text-base font-normal ml-1">{ind.unit}</span>
                </div>
                <div className="text-xs text-slate-500 mb-3">{ind.description}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Threshold: {ind.threshold}{ind.unit}</span>
                    <span>Target: {ind.target}{ind.unit}</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 border border-slate-200">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: colorMap[ind.color].bar }}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{ind.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary table */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 mb-1">Indicator Summary — Value vs. Threshold vs. Target</h4>
          <p className="text-xs text-slate-500 mb-4">All six indicators in one view, with computed status for quick review.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Indicator</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Current Value</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Threshold</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Target</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {programIndicators.map((ind) => {
                  const status = getIndicatorStatus(ind);
                  return (
                    <tr key={ind.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{ind.label}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{ind.category}</td>
                      <td className="px-4 py-3 font-mono font-semibold text-slate-800">{ind.value}{ind.unit}</td>
                      <td className="px-4 py-3 font-mono text-slate-500">{ind.threshold}{ind.unit}</td>
                      <td className="px-4 py-3 font-mono text-slate-500">{ind.target}{ind.unit}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${status.cls}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="font-semibold text-blue-800 mb-1">📌 Rate-Based Indicators</div>
            IPM completion %, repairs within 24h, callbacks % — expressed as a proportion.
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="font-semibold text-purple-800 mb-1">🚨 Sentinel-Event Indicators</div>
            Any equipment failure resulting in patient injury triggers immediate analysis. Threshold is always <strong>zero</strong>.
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="font-semibold text-amber-800 mb-1">📈 Continuous Variable Indicators</div>
            IPMs scheduled per month, repair requests per week — used to track workload trends over time.
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="font-semibold text-green-800 mb-1">🌐 External Benchmarks</div>
            Labor cost per repair, cost per bed — used for comparison with other CE departments.
          </div>
        </div>
      </div>

      {/* ── Failure Rate Ranking Table ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-1">Equipment Failure Rate Ranking</h3>
        <p className="text-xs text-slate-500 mb-4">Sorted by λ (highest risk first) — λ = DownTime / LoadingTime</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Rank</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Equipment</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Department</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Maintenance Level</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">λ (failures/month)</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">MTBF</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {ranked.slice(0, 10).map((item, index) => {
                const risk = getRiskLevel(item.failureRate);
                const maintenanceColor = getMaintenanceColor(item.maintenanceLevel);
                const isTopThree = index < 3;
                return (
                  <tr key={item.id}
                    className={`border-b border-slate-200 ${isTopThree ? 'bg-red-50' : 'hover:bg-teal-50'}`}>
                    <td className="px-4 py-3 font-medium text-slate-900">{getMedalEmoji(index + 1)}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.department}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${maintenanceColor}`}>
                        {item.maintenanceLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">{item.failureRate.toFixed(3)} /mo</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{item.mtbf.toFixed(1)} mo</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${risk.color}`}>
                        {risk.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-6 text-sm text-slate-600">
          <div className="font-semibold text-slate-900 mb-2">📊 Interpretation:</div>
          <p>
            The failure rate <span className="font-mono font-semibold">λ = DownTime / LoadingTime</span> indicates expected failures
            per month. <span className="font-mono font-semibold">MTBF = 1/λ</span> is the average time between consecutive failures.
            Equipment with <strong>λ &gt; 0.15/month</strong> (MRI Scanner, Ultrasound Scanner, Defibrillator) requires priority
            attention and may need <strong>Depot</strong> or <strong>Intermediate</strong> level maintenance intervention.
          </p>
        </div>
      </div>

    </div>
  );
}