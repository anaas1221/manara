export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="card p-6 text-center text-[var(--muted)]">
        <i className="bi bi-tools text-3xl" />
        <p className="mt-3">هذا القسم قادم قريبًا بإذن الله.</p>
      </div>
    </div>
  );
}