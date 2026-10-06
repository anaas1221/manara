export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M24 4 L30 14 L18 14 Z" fill="#d4af37" />
      <rect x="14" y="14" width="20" height="26" rx="2" fill="currentColor" opacity="0.15" />
      <path d="M14 14 L24 6 L34 14 Z" fill="currentColor" />
      <rect x="16" y="18" width="16" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="24" cy="27" r="3.5" fill="#d4af37" />
      <path d="M10 42 L38 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}