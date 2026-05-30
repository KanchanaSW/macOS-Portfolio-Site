"use client";

import { useCallback, useRef } from "react";

interface UseDraggableOptions {
  onDragEnd?: (position: { x: number; y: number }) => void;
  disabled?: boolean;
}

export function useDraggable(
  initialPosition: { x: number; y: number },
  options: UseDraggableOptions = {}
) {
  const { onDragEnd, disabled = false } = options;
  const positionRef = useRef(initialPosition);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  positionRef.current = initialPosition;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select, [role='button'], [role='group']")) return;
      isDragging.current = true;
      dragOffset.current = {
        x: e.clientX - positionRef.current.x,
        y: e.clientY - positionRef.current.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [disabled]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent, onMove: (pos: { x: number; y: number }) => void) => {
      if (!isDragging.current || disabled) return;

      const menubarHeight = 28;
      const dockHeight = 80;
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - dockHeight - 100;

      const x = Math.max(0, Math.min(maxX, e.clientX - dragOffset.current.x));
      const y = Math.max(menubarHeight, Math.min(maxY, e.clientY - dragOffset.current.y));

      onMove({ x, y });
    },
    [disabled]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent, currentPosition: { x: number; y: number }) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      onDragEnd?.(currentPosition);
    },
    [onDragEnd]
  );

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
