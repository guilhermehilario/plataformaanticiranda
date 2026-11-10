import { createContext, useCallback, useContext, useState } from 'react'
import { Icon } from './Icons.jsx'

const ToastContext = createContext(() => {})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, tone = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, tone }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-fade-in flex w-full max-w-sm items-start gap-2 border-2 border-ink px-3.5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider shadow-[4px_4px_0_0_var(--color-ink)] ${
              t.tone === 'error'
                ? 'bg-brand text-paper'
                : t.tone === 'info'
                  ? 'bg-ink text-paper'
                  : 'bg-gold text-ink'
            }`}
            role="status"
          >
            <Icon
              name={t.tone === 'error' ? 'close' : 'check'}
              className="mt-0.5 h-4 w-4 shrink-0"
            />
            <span className="normal-case tracking-normal">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
