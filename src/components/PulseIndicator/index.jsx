export default function PulseIndicator({ colorClass }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass}`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-2 w-2 ${colorClass}`}
      ></span>
    </span>
  );
}
