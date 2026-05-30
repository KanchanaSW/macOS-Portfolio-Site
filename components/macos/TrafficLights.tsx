"use client";

interface TrafficLightsProps {
  onClose: () => void;
  onMinimize: () => void;
  onFullscreen: () => void;
  isFullscreen?: boolean;
}

export function TrafficLights({
  onClose,
  onMinimize,
  onFullscreen,
  isFullscreen = false,
}: TrafficLightsProps) {
  const stopPointer = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <div
      className="flex items-center gap-2 pl-3"
      role="group"
      aria-label="Window controls"
      onPointerDown={stopPointer}
    >
      <button
        type="button"
        onPointerDown={stopPointer}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="group relative h-3 w-3 rounded-full bg-[var(--traffic-red)] transition-opacity hover:opacity-90"
        aria-label="Close window"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <svg viewBox="0 0 8 8" className="h-2 w-2" fill="none" stroke="#4a0000" strokeWidth="1.5">
            <path d="M2 2l4 4M6 2L2 6" />
          </svg>
        </span>
      </button>
      <button
        type="button"
        onPointerDown={stopPointer}
        onClick={(e) => {
          e.stopPropagation();
          onMinimize();
        }}
        className="group relative h-3 w-3 rounded-full bg-[var(--traffic-yellow)] transition-opacity hover:opacity-90"
        aria-label="Minimize window"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <svg viewBox="0 0 8 8" className="h-2 w-2" fill="none" stroke="#5a4000" strokeWidth="1.5">
            <path d="M1.5 4h5" />
          </svg>
        </span>
      </button>
      <button
        type="button"
        onPointerDown={stopPointer}
        onClick={(e) => {
          e.stopPropagation();
          onFullscreen();
        }}
        className="group relative h-3 w-3 rounded-full bg-[var(--traffic-green)] transition-opacity hover:opacity-90"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          {isFullscreen ? (
            <svg viewBox="0 0 8 8" className="h-2 w-2" fill="none" stroke="#003800" strokeWidth="1">
              <path d="M2 2h4v4H2z" />
            </svg>
          ) : (
            <svg viewBox="0 0 8 8" className="h-2 w-2" fill="none" stroke="#003800" strokeWidth="1">
              <path d="M1 3V1h2M5 1h2v2M7 5v2H5M3 7H1V5" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
