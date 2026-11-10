export function Icon({ name, className = 'h-5 w-5', ...props }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6a2.5 2.5 0 0 0-2.5 2.5V12A2.5 2.5 0 0 0 6 14.5" />
      </>
    ),
    whatsapp: (
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.5A8.4 8.4 0 1 1 20.5 11.6Z" />
    ),
    qr: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1.5" />
        <rect x="15" y="3" width="6" height="6" rx="1.5" />
        <rect x="3" y="15" width="6" height="6" rx="1.5" />
        <path d="M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z" />
      </>
    ),
    link: (
      <>
        <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1 1" />
        <path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1-1" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="3" />
        <path d="M3 10h18M16.5 14.5h.01" />
      </>
    ),
    home: (
      <>
        <path d="M4 10.5 12 4l8 6.5" />
        <path d="M6 9.5V20h12V9.5" />
      </>
    ),
    store: (
      <>
        <path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Z" />
        <path d="M4 9 6 4h12l2 5M10 20v-5h4v5" />
      </>
    ),
    check: <path d="m5 13 4 4L19 7" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    pin: (
      <>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
        <circle cx="12" cy="11" r="2.2" />
      </>
    ),
    star: (
      <path d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z" />
    ),
    logout: (
      <>
        <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
        <path d="M10 8l-4 4 4 4M6 12h9" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    camera: (
      <>
        <path d="M4 8.5h2.5L8 6h8l1.5 2.5H20a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
        <circle cx="12" cy="13.5" r="3.2" />
      </>
    ),
    phone: (
      <path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2Z" />
    ),
    lock: (
      <>
        <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
        <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8.5" r="3.8" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3.5 5 6v6c0 4.3 7 9 7 9s7-4.7 7-9V6l-7-2.5Z" />
        <path d="m9.5 12 1.8 1.8L15 10" />
      </>
    ),
    trend: (
      <>
        <path d="M4 16l5-5 3.5 3.5L20 7" />
        <path d="M15 7h5v5" />
      </>
    ),
    pix: (
      <>
        <path d="m12 3 4.5 4.5L12 12 7.5 7.5 12 3Z" />
        <path d="m12 12 4.5 4.5L12 21l-4.5-4.5L12 12Z" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v4.5l3 1.8" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
        <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5Z" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7.5" width="18" height="12.5" rx="1.5" />
        <path d="M9 7.5V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5v2M3 12h18" />
      </>
    ),
    heart: (
      <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7 3c0 5-7 9.4-7 9.4Z" />
    ),
    award: (
      <>
        <circle cx="12" cy="9" r="5.5" />
        <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
      </>
    ),
    ticket: (
      <>
        <path d="M3 9V6.5h18V9a2.5 2.5 0 0 0 0 5v2.5H3V14a2.5 2.5 0 0 0 0-5Z" />
        <path d="M12 7v2m0 3v2m0 3v-2" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? null}
    </svg>
  )
}

export function Star({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="m12 2.2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8-6.1-3.4-6.1 3.4 1.4-6.8L2.2 9.3l6.9-.8L12 2.2Z" />
    </svg>
  )
}

export function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-brand text-paper shadow-[3px_3px_0_0_var(--color-ink)] sm:h-10 sm:w-10">
        <Star className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block font-display text-base font-bold uppercase tracking-[0.1em] sm:text-lg sm:tracking-[0.12em]">
          Indica<span className="text-brand">Local</span>
        </span>
        <span className="mt-1 hidden font-display text-[9px] uppercase tracking-[0.3em] text-ink/50 sm:block">
          Coletivo de bairro
        </span>
      </span>
    </div>
  )
}
