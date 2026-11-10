import { useMemo } from 'react'
import { CATEGORIES, PARTNERS, WALLET } from '../data/mock.js'
import { Icon, Star } from './Icons.jsx'
import { PartnerCard } from './PartnerCard.jsx'

const brl = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`

export function Dashboard({
  user,
  search,
  onSearch,
  category,
  onCategory,
  onGenerateCoupon,
  onGoWallet,
}) {
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return PARTNERS.filter((p) => {
      const matchCategory = category === 'todos' || p.categoryId === category
      const matchTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.city.toLowerCase().includes(term) ||
        p.highlight.toLowerCase().includes(term)
      return matchCategory && matchTerm
    })
  }, [search, category])

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
      {/* Painel de boas-vindas */}
      <section className="animate-fade-in border-2 border-ink bg-brand text-paper shadow-[7px_7px_0_0_var(--color-ink)]">
        <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-ink px-4 py-2">
          <p className="poster-kicker flex shrink-0 items-center gap-1.5 text-[10px] text-paper">
            <Star className="h-2.5 w-2.5 text-gold" /> Boletim do membro ativo
          </p>
          <p
            className="poster-kicker min-w-0 truncate text-right text-[10px] text-paper/70"
            title={`${user.nickname} · ${user.status}`}
          >
            {user.nickname}
            <span className="hidden sm:inline"> · {user.status}</span>
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="rays absolute inset-0" />
          <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5 sm:p-7">
            <div>
              <p className="poster-kicker text-[10px] text-paper/85">
                Bem-vindo, {user.nickname} · {user.status} 🌟
              </p>
              <h1 className="poster-heading mt-2 text-[1.9rem] leading-[0.95] sm:text-[2.7rem]">
                O bairro
                <br />
                é <span className="text-gold">nosso</span>.
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/85">
                Indique os parceiros que você confia e receba em dinheiro por cada
                indicação confirmada.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:w-64">
              <div className="border-2 border-paper/85 bg-brand-dark/40 p-3">
                <p className="poster-kicker text-[9px] text-paper/70">Saldo disponível</p>
                <p className="mt-1 font-display text-xl font-bold">{brl(WALLET.available)}</p>
              </div>
              <div className="border-2 border-paper/85 bg-brand-dark/40 p-3">
                <p className="poster-kicker text-[9px] text-paper/70">Indicações</p>
                <p className="mt-1 font-display text-xl font-bold">
                  {WALLET.confirmedIndications}
                </p>
              </div>
              <button
                onClick={onGoWallet}
                className="col-span-2 flex items-center justify-center gap-2 border-2 border-ink bg-paper py-2.5 font-display text-xs font-semibold uppercase tracking-widest text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
              >
                Ver minha carteira
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="mt-7">
        <div className="mb-2.5 flex items-end justify-between gap-2">
          <h2 className="poster-kicker flex items-center gap-1.5">
            <Star className="h-3 w-3 text-brand" /> Categorias
          </h2>
          <span className="poster-kicker text-[9px] text-ink/40">Deslize →</span>
        </div>
        <div className="no-scrollbar -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:px-0">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              className={`flex shrink-0 items-center gap-1.5 border-2 border-ink px-2.5 py-2 font-display text-[11px] font-semibold uppercase tracking-wider transition sm:px-3 sm:py-1.5 sm:text-xs ${
                category === c.id
                  ? 'bg-brand text-paper shadow-[3px_3px_0_0_var(--color-ink)]'
                  : 'bg-paper text-ink/70 hover:bg-paper-dark hover:text-ink'
              }`}
            >
              <span aria-hidden="true">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Feed de parceiros */}
      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-ink bg-ink px-3 py-2.5 text-paper sm:px-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em]">
            Cartilha de parceiros
          </h2>
          <div className="flex items-center gap-3">
            <p className="poster-kicker text-[9px] text-paper/70">
              {filtered.length}{' '}
              {filtered.length === 1 ? 'parceiro' : 'parceiros'}
              {search ? ` · “${search}”` : ''}
            </p>
            {(search || category !== 'todos') && (
              <button
                onClick={() => {
                  onSearch('')
                  onCategory('todos')
                }}
                className="border border-paper/60 px-2 py-0.5 font-display text-[9px] font-semibold uppercase tracking-widest transition hover:bg-paper hover:text-ink"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-4 border-2 border-dashed border-ink bg-paper px-6 py-14 text-center">
            <Star className="mx-auto h-8 w-8 text-brand/40" />
            <p className="poster-heading mt-3 text-xl">Nenhum parceiro encontrado</p>
            <p className="mt-1 text-sm text-ink/60">
              Tente outro termo ou selecione uma categoria diferente.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtered.map((p) => (
              <PartnerCard
                key={p.id}
                partner={p}
                user={user}
                onGenerateCoupon={onGenerateCoupon}
              />
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 flex items-center gap-3">
        <div className="stripes h-3 flex-1 border-2 border-ink" />
        <p className="poster-kicker shrink-0 text-[9px] text-ink/50">
          Indique · Economize · Receba
        </p>
        <div className="stripes h-3 flex-1 border-2 border-ink" />
      </div>
    </div>
  )
}
