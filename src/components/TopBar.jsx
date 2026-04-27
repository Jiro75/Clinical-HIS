export default function TopBar({ title }) {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <span className="text-sm text-slate-500">April 2026</span>
    </header>
  );
}
