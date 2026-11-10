import { useEffect } from 'react'
import { Icon, Star } from './Icons.jsx'

export function Modal({ open, onClose, title, subtitle, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-2 pb-3 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`animate-pop max-h-[88vh] w-full ${maxWidth} overflow-y-auto border-2 border-ink bg-paper shadow-[5px_5px_0_0_var(--color-ink)] sm:max-h-[92vh] sm:shadow-[8px_8px_0_0_var(--color-ink)]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b-2 border-ink bg-brand px-4 py-3 text-paper sm:px-5">
          <div>
            <h3 className="font-display text-base font-semibold uppercase tracking-wide">
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-paper/80">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="border-2 border-paper/80 p-1 text-paper transition hover:bg-paper hover:text-brand"
            aria-label="Fechar"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <div className="px-4 pb-5 pt-4 sm:px-5">{children}</div>
        <div className="flex items-center justify-center gap-2 border-t-2 border-ink bg-paper-dark px-4 py-1.5">
          <div className="stripes h-1.5 w-12 border border-ink/50" />
          <Star className="h-2.5 w-2.5 text-brand" />
          <div className="stripes h-1.5 w-12 border border-ink/50" />
        </div>
      </div>
    </div>
  )
}
