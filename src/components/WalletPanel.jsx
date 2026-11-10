import { useState } from 'react'
import { REFERRAL_HISTORY, WALLET } from '../data/mock.js'
import { Icon, Star } from './Icons.jsx'
import { Modal } from './Modal.jsx'
import { useToast } from './Toast.jsx'

const brl = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`

export function WalletPanel({ user }) {
  const toast = useToast()
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [pixKey, setPixKey] = useState(WALLET.pixKey)
  const [sending, setSending] = useState(false)
  const [withdrawn, setWithdrawn] = useState(false)

  const requestWithdraw = () => {
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setWithdrawOpen(false)
      setWithdrawn(true)
      toast(`Saque de ${brl(WALLET.available)} solicitado via PIX.`)
    }, 900)
  }

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
      <div className="border-2 border-ink bg-ink text-paper shadow-[6px_6px_0_0_var(--color-ink)]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-3.5">
          <div>
            <p className="poster-kicker flex items-center gap-1.5 text-[9px] text-gold">
              <Star className="h-2.5 w-2.5" /> Tesouraria do coletivo
            </p>
            <h1 className="poster-heading mt-1 text-xl sm:text-2xl">
              Minha carteira de afiliado
            </h1>
          </div>
          <span className="poster-tag border-paper bg-brand text-paper">
            <Icon name="check" className="h-3.5 w-3.5" /> Conta verificada
          </span>
        </div>
        <div className="flex items-center gap-2 border-t-2 border-paper/20 px-3 py-1.5 sm:px-5">
          <div className="stripes h-2 w-12 border border-paper/30" />
          <p className="poster-kicker text-[9px] text-paper/60">
            {user.nickname} · comissões e histórico de indicações
          </p>
        </div>
      </div>

      {/* Métricas */}
      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="relative overflow-hidden border-2 border-ink bg-brand p-4 text-paper shadow-[6px_6px_0_0_var(--color-ink)] sm:p-5">
          <div className="rays absolute inset-0" />
          <Star className="pointer-events-none absolute -bottom-5 -right-4 h-24 w-24 text-paper/10" />
          <div className="relative">
            <p className="poster-kicker text-[9px] text-paper/80">
              Saldo disponível para saque
            </p>
            <p className="mt-1.5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {brl(withdrawn ? 0 : WALLET.available)}
            </p>
            <button
              onClick={() => setWithdrawOpen(true)}
              disabled={withdrawn}
              className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-ink bg-paper py-2.5 font-display text-[11px] font-semibold uppercase tracking-widest text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:border-paper/40 disabled:bg-paper/20 disabled:text-paper/60 disabled:shadow-none"
            >
              <Icon name="pix" className="h-4 w-4" />
              Solicitar saque via PIX
            </button>
            <p className="mt-1.5 text-center text-[9px] uppercase tracking-wider text-paper/70">
              Chave CPF vinculada
            </p>
          </div>
        </div>

        <div className="border-2 border-ink bg-paper p-4 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-5">
          <div className="flex items-center gap-2">
            <Icon name="trend" className="h-4 w-4 text-brand" />
            <p className="poster-kicker text-[9px] text-ink/50">Total ganho no mês</p>
          </div>
          <p className="mt-1.5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {brl(WALLET.monthTotal)}
          </p>
          <p className="mt-3 text-xs text-ink/60">+18% em relação ao mês anterior</p>
          <div className="mt-2 h-3 border-2 border-ink bg-paper-dark p-0.5">
            <div className="h-full w-[68%] bg-brand" />
          </div>
          <p className="mt-1.5 text-[10px] uppercase tracking-wider text-ink/40">
            Meta mensal: R$ 560,00
          </p>
        </div>

        <div className="border-2 border-ink bg-paper p-4 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-5">
          <div className="flex items-center gap-2">
            <Icon name="user" className="h-4 w-4 text-brand" />
            <p className="poster-kicker text-[9px] text-ink/50">Indicações confirmadas</p>
          </div>
          <p className="mt-1.5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {WALLET.confirmedIndications}{' '}
            <span className="font-display text-base font-medium text-ink/40">vendas</span>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="border-2 border-ink/20 bg-paper-dark/60 px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-wider text-ink/40">Cliques</p>
              <p className="font-display text-sm font-bold">{WALLET.clicks}</p>
            </div>
            <div className="border-2 border-ink/20 bg-paper-dark/60 px-2.5 py-2">
              <p className="text-[10px] uppercase tracking-wider text-ink/40">Conversão</p>
              <p className="font-display text-sm font-bold">
                {WALLET.conversion.toString().replace('.', ',')}%
              </p>
            </div>
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-wider text-ink/40">
            Pendente: {brl(WALLET.pending)}
          </p>
        </div>
      </section>

      {/* Histórico */}
      <section className="mt-6 border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--color-ink)]">
        <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-ink px-4 py-2.5 text-paper sm:px-5">
          <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em]">
            <Star className="h-3.5 w-3.5 text-gold" />
            Histórico de indicações convertidas
          </h2>
          <span className="poster-kicker text-[9px] text-paper/60">
            {REFERRAL_HISTORY.length} recentes
          </span>
        </div>

        <div className="hidden md:block md:overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead className="border-b-2 border-ink text-[10px] uppercase tracking-widest">
              <tr>
                <th className="px-5 py-2 font-display font-semibold">Data</th>
                <th className="px-3 py-2 font-display font-semibold">Estabelecimento</th>
                <th className="px-3 py-2 font-display font-semibold">Serviço</th>
                <th className="px-3 py-2 font-display font-semibold">Cliente</th>
                <th className="px-3 py-2 font-display font-semibold">Comissão</th>
                <th className="px-5 py-2 text-right font-display font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-ink/10">
              {REFERRAL_HISTORY.map((row) => (
                <tr key={row.id} className="transition hover:bg-paper-dark/50">
                  <td className="whitespace-nowrap px-5 py-3 text-ink/55">{row.date}</td>
                  <td className="px-3 py-3 font-medium">{row.establishment}</td>
                  <td className="px-3 py-3 text-ink/70">{row.service}</td>
                  <td className="px-3 py-3 text-ink/55">{row.customer}</td>
                  <td className="px-3 py-3 font-display font-bold text-brand">
                    {brl(row.commission)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Versão mobile em cards */}
        <ul className="divide-y-2 divide-ink/10 md:hidden">
          {REFERRAL_HISTORY.map((row) => (
            <li key={row.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-wide">
                    {row.establishment}
                  </p>
                  <p className="text-xs text-ink/60">
                    {row.service} · {row.customer}
                  </p>
                </div>
                <StatusBadge status={row.status} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-ink/45">{row.date}</span>
                <span className="font-display font-bold text-brand">{brl(row.commission)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-4 flex items-start gap-2 border-2 border-ink/20 bg-paper-dark/60 px-3.5 py-2.5 text-[11px] text-ink/60">
        <Icon name="clock" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Comissões com status “Pendente” são liberadas após o período de garantia do parceiro
        (7 dias).
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="stripes h-3 flex-1 border-2 border-ink" />
        <p className="poster-kicker shrink-0 text-[9px] text-ink/50">
          Quem indica, recebe
        </p>
        <div className="stripes h-3 flex-1 border-2 border-ink" />
      </div>

      <Modal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        title="Solicitar saque via PIX"
        subtitle="Transferência para chave CPF vinculada"
      >
        <div className="relative overflow-hidden border-2 border-ink bg-brand p-4 text-paper">
          <div className="rays absolute inset-0" />
          <div className="relative">
            <p className="poster-kicker text-[9px] text-paper/80">Valor disponível</p>
            <p className="font-display text-3xl font-bold">{brl(WALLET.available)}</p>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="pix" className="poster-label">
            Chave PIX (CPF)
          </label>
          <input
            id="pix"
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            className="poster-input mt-1.5"
          />
          <p className="mt-1.5 flex items-center gap-1 text-[10px] uppercase tracking-wider text-ink/45">
            <Icon name="shield" className="h-3.5 w-3.5" />
            Chave vinculada ao CPF {user.cpf.slice(0, 3)}.***.***-**
          </p>
        </div>

        <button
          onClick={requestWithdraw}
          disabled={sending}
          className="poster-btn-red mt-4 w-full py-3"
        >
          {sending ? 'Processando saque...' : `Confirmar saque de ${brl(WALLET.available)}`}
        </button>
        <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-ink/40">
          O valor cai na sua conta em até 1 dia útil · mínimo R$ 20,00
        </p>
      </Modal>
    </div>
  )
}

function StatusBadge({ status }) {
  const paid = status === 'Pago'
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 border-2 border-ink px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wider ${
        paid ? 'bg-ink text-paper' : 'bg-gold text-ink'
      }`}
    >
      <span className={`h-1.5 w-1.5 ${paid ? 'bg-paper' : 'bg-ink'}`} />
      {status}
    </span>
  )
}
