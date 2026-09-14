export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">{title}</h1>
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-slate-400 text-center">
        This section is under construction.
      </div>
    </div>
  );
}
