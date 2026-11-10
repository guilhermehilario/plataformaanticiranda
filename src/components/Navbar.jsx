import { useEffect, useRef, useState } from "react";
import { Icon, Logo, Star } from "./Icons.jsx";

const TABS = [
  { id: "inicio", label: "Início", icon: "home" },
  { id: "carteira", label: "Carteira", icon: "wallet" },
  { id: "parceiro", label: "Parceiro", icon: "store" },
  { id: "apoio", label: "Apoio & Vagas", icon: "heart" },
];

export function Navbar({
  user,
  activeTab,
  onTabChange,
  search,
  onSearch,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-ink bg-paper">
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-brand px-3 py-1.5 text-paper sm:px-6">
        <p className="poster-kicker flex items-center gap-1.5 text-[10px] text-paper/90">
          <Star className="h-2.5 w-2.5" />
          Órgão oficial do coletivo anti-ciranda
        </p>
        <p className="poster-kicker hidden text-[10px] text-paper/90 sm:block">
          Edição nº 07 · Novembro de 2026
        </p>
      </div>

      <div className="mx-auto flex min-w-0 max-w-6xl items-center gap-2 px-3 py-2.5 sm:gap-5 sm:px-6 sm:py-3">
        <button
          onClick={() => onTabChange("inicio")}
          className="shrink-0 text-left"
        >
          <Logo />
        </button>

        <div className="relative hidden flex-1 lg:block">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/50"
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar serviços ou produtos (pizza, mecânica...)"
            className="w-full border-2 border-ink bg-paper py-2.5 pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:bg-white focus:shadow-[3px_3px_0_0_var(--color-brand)]"
          />
        </div>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 border-2 px-3 py-2 font-display text-xs font-semibold uppercase tracking-widest transition ${
                activeTab === tab.id
                  ? "border-ink bg-brand text-paper shadow-[3px_3px_0_0_var(--color-ink)]"
                  : "border-transparent text-ink/70 hover:border-ink hover:bg-paper-dark"
              }`}
            >
              <Icon name={tab.icon} className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="relative ml-auto min-w-0 lg:ml-1" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex min-w-0 max-w-full items-center gap-2 border-2 border-ink bg-paper p-1 shadow-[3px_3px_0_0_var(--color-ink)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none sm:p-1.5 sm:pr-2.5"
            aria-haspopup="menu"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center border-2 border-ink bg-brand font-display text-[10px] font-bold uppercase tracking-wide text-paper sm:h-8 sm:w-8 sm:text-xs">
              {user.avatar}
            </span>
            <span className="min-w-0 text-left">
              <span
                className="block truncate font-display text-xs font-semibold uppercase tracking-wide"
                title={user.nickname}
              >
                {user.nickname}
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-wider text-brand sm:block">
                {user.status}
              </span>
            </span>
            <Icon name="menu" className="h-4 w-4 shrink-0 lg:hidden" />
          </button>

          {menuOpen && (
            <div
              className="animate-pop absolute right-0 z-50 mt-3 w-64 border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--color-ink)]"
              role="menu"
            >
              <div className="border-b-2 border-ink bg-ink px-3 py-2.5 text-paper">
                <p className="font-display text-sm font-semibold uppercase tracking-wide">
                  {user.name}
                </p>
                <p className="text-[11px] text-paper/70">{user.phone}</p>
                <p className="mt-1 inline-flex items-center gap-1 border border-paper/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest">
                  <Star className="h-2.5 w-2.5" />
                  {user.status}
                </p>
              </div>
              <div className="lg:hidden">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 font-display text-xs font-semibold uppercase tracking-widest text-ink/80 transition hover:bg-paper-dark"
                  >
                    <Icon name={tab.icon} className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
                <div className="h-0.5 bg-ink" />
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 font-display text-xs font-semibold uppercase tracking-widest text-brand transition hover:bg-brand hover:text-paper"
              >
                <Icon name="logout" className="h-4 w-4" />
                Sair da conta
              </button>
            </div>
          )}
        </div>
      </div>

      {/* busca no mobile */}
      <div className="px-3 pb-2.5 sm:px-4 sm:pb-3 lg:hidden">
        <div className="relative">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50"
          />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar serviços ou produtos..."
            className="w-full border-2 border-ink bg-paper py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-ink/35 focus:bg-white"
          />
        </div>
      </div>
    </header>
  );
}
