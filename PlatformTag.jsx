import { platformMeta } from "../constants";

export default function PlatformTag({ platform }) {
  const meta = platformMeta(platform);
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
}
