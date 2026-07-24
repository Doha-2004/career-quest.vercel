import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'

const COLORS = ['#6d4dff', '#a855f7', '#38bdf8', '#f59e0b', '#10b981', '#f43f5e']

// A dependency-free confetti effect: a burst of colored divs that fall and
// spin via CSS, removed automatically when AppContext clears `celebrating`.
// Keeping this self-contained (no canvas-confetti dependency) means it works
// the moment the project is cloned, with zero extra installs.
export default function ConfettiOverlay() {
  const { celebrating } = useAppContext()

  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2 + Math.random() * 1.2,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 160,
        shape: Math.random() > 0.5 ? '50%' : '3px',
      })),
    // Regenerate the burst pattern each time a celebration starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [celebrating]
  )

  if (!celebrating) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[110] overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            '--rotate': `${p.rotate}deg`,
          }}
          className="absolute animate-confettiFall"
        />
      ))}
    </div>
  )
}
