interface LogoProps {
  s?: number;
}

export function LogoClaude({ s = 40 }: LogoProps) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="g-claude" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bf6040" /><stop offset="1" stopColor="#e8886a" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#g-claude)" />
      <path d="M20 9L23.8 18H33L25.6 23.5L28.2 32L20 26.5L11.8 32L14.4 23.5L7 18H16.2Z" fill="white" opacity="0.92" />
    </svg>
  );
}

export function LogoCode({ s = 40 }: LogoProps) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="g-code" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1d4ed8" /><stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#g-code)" />
      <path d="M15 14L8 20L15 26" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 14L32 20L25 26" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="11" x2="18" y2="29" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function LogoDesign({ s = 40 }: LogoProps) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="g-design" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#g-design)" />
      <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
      <circle cx="20" cy="20" r="2.5" fill="white" />
      <line x1="20" y1="8" x2="20" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="20" y1="28" x2="20" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="8" y1="20" x2="12" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="28" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function LogoCowork({ s = 40 }: LogoProps) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="g-cowork" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b45309" /><stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#g-cowork)" />
      <circle cx="14" cy="20" r="3.5" fill="white" opacity="0.9" />
      <circle cx="26" cy="14" r="3" fill="white" opacity="0.7" />
      <circle cx="26" cy="26" r="3" fill="white" opacity="0.7" />
      <line x1="17.5" y1="20" x2="23" y2="14.5" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="17.5" y1="20" x2="23" y2="25.5" stroke="white" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

const LOGO_MAP: Record<string, (props: LogoProps) => JSX.Element> = {
  claude: LogoClaude,
  code: LogoCode,
  design: LogoDesign,
  cowork: LogoCowork,
};

interface ToolLogoProps {
  id: string;
  size?: number;
}

export function ToolLogo({ id, size = 40 }: ToolLogoProps) {
  const Comp = LOGO_MAP[id];
  if (!Comp) return null;
  return <Comp s={size} />;
}
