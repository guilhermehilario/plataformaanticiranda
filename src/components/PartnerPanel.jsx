import { useState } from 'react'
import { COUPONS, PARTNER_CATALOG, REFERRAL_HISTORY } from '../data/mock.js'
import { Icon, Star } from './Icons.jsx'
import { QrCode } from './QrCode.jsx'
import { useToast } from './Toast.jsx'

const brl = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`

export function PartnerPanel({ coupons = [] }) {
  const toast = useToast()
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [scanning, setScanning] = useState(false)

  const knownCoupons = [...coupons, ...COUPONS, ...PARTNER_CATALOG]

  const validate = (rawCode) => {
    const clean = rawCode.trim().toUpperCase()
    setError('')
    setResult(null)
    if (!clean) {
      setError('Digite o código do cupom para validar.')
      return
    }
    const found = knownCoupons.find((c) => c.code.toUpperCase() === clean)
    if (!found) {
      setError(`Cupom “${clean}” não encontrado. Tente M-8921 ou M-4471.`)
      return
    }
    setResult({
      code: found.code,
      partner: found.partner,
      holder: found.holder ?? '@mariasilva',
      discount: found.discount,
      commission: found.commission,
      referrer: found.referrer ?? '@joaosilva',
    })
  }

  const scan = () => {
    setScanning(true)
    setError('')
    setResult(null)
    setTimeout(() => {
      setScanning(false)
      setCode('M-8921')
      validate('M-8921')
      toast('QR Code lido com sucesso (simulação).', 'info')
    }, 900)
  }

  const paidCount = REFERRAL_HISTORY.filter((r) => r.status === 'Pago').length
  const totalCommission = REFERRAL_HISTORY.reduce((s, r) => s + r.commission, 0)

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
      <div className="border-2 border-ink bg-ink text-paper shadow-[6px_6px_0_0_var(--color-ink)]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-3.5">
          <div>
            <p className="poster-kicker flex items-center gap-1.5 text-[9px] text-gold">
              <Star className="h-2.5 w-2.5" /> Balcão do parceiro
            </p>
            <h1 className="poster-heading mt-1 text-xl sm:text-2xl">Painel do parceiro</h1>
          </div>
          <span className="poster-tag border-paper bg-brand text-paper">
            <Icon name="store" className="h-3.5 w-3.5" /> Pizzaria Italiana · Mauá, SP
          </span>
        </div>
        <div className="flex items-center gap-2 border-t-2 border-paper/20 px-3 py-1.5 sm:px-5">
          <div className="stripes h-2 w-12 border border-paper/30" />
          <p className="poster-kicker text-[9px] text-paper/60">
            Valide cupons no balcão e acompanhe as indicações recebidas
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        {/* Validador */}
        <section className="overflow-hidden border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--color-ink)] lg:col-span-3">
          <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-brand px-3 py-2 text-paper sm:px-4">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest">
              <Icon name="qr" className="h-4 w-4" />
              Validador rápido de cupons
            </h2>
            <Star className="h-3.5 w-3.5 text-gold" />
          </div>

          <div className="p-4 sm:p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              validate(code)
            }}
            className="mt-3 flex flex-col gap-2 sm:flex-row"
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Digite o código (ex: M-8921)"
              className="poster-input flex-1 font-mono uppercase tracking-wider placeholder:font-sans placeholder:normal-case placeholder:tracking-normal"
            />
            <button type="submit" className="poster-btn-red w-full py-3 sm:w-auto sm:px-5">
              Validar cupom
            </button>
          </form>

          <button
            onClick={scan}
            disabled={scanning}
            className="mt-2 flex w-full items-center justify-center gap-2 border-2 border-dashed border-ink py-3 font-display text-xs font-semibold uppercase tracking-widest text-ink/70 transition hover:border-brand hover:bg-brand/5 hover:text-brand disabled:opacity-60"
          >
            <Icon name="camera" className="h-4 w-4" />
            {scanning ? 'Lendo QR Code da câmera...' : 'Escanear QR Code da câmera'}
          </button>

          {error && (
            <p className="mt-3 border-2 border-ink bg-brand/10 px-3.5 py-2.5 text-xs font-semibold text-brand">
              {error}
            </p>
          )}

          {result && (
            <div className="animate-fade-in relative mt-4 overflow-hidden border-2 border-ink bg-brand text-paper shadow-[5px_5px_0_0_var(--color-ink)]">
              <div className="rays absolute inset-0" />
              <div className="relative p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-paper bg-paper text-brand">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold uppercase tracking-widest">
                      Cupom válido!
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/90">
                      Cliente: <span className="font-semibold text-paper">{result.holder}</span>{' '}
                      | Desconto aplicado:{' '}
                      <span className="font-semibold text-paper">{result.discount}%</span> |
                      Comissão de{' '}
                      <span className="font-semibold text-gold">{brl(result.commission)}</span>{' '}
                      creditada para{' '}
                      <span className="font-semibold text-paper">{result.referrer}</span>
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-paper/70">
                      Cupom {result.code} · {result.partner}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    toast('Desconto aplicado e comissão registrada.')
                    setResult(null)
                    setCode('')
                  }}
                  className="mt-3 w-full border-2 border-ink bg-paper py-2.5 font-display text-xs font-semibold uppercase tracking-widest text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Confirmar atendimento
                </button>
              </div>
            </div>
          )}

          <div className="mt-5 border-2 border-ink/20 bg-paper-dark/60 p-3">
            <p className="poster-kicker text-[9px] text-ink/50">Cupons válidos para teste</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['M-8921', 'M-4471', 'M-3310', 'M-1092'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCode(c)
                    validate(c)
                  }}
                  className="border-2 border-ink bg-paper px-2 py-1 font-mono text-[11px] font-bold text-ink/70 transition hover:bg-brand hover:text-paper"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Resumo do lojista + QR de exemplo */}
        <section className="space-y-4 lg:col-span-2">
          <div className="relative overflow-hidden border-2 border-ink bg-brand p-4 text-paper shadow-[6px_6px_0_0_var(--color-ink)] sm:p-5">
            <div className="rays absolute inset-0" />
            <Star className="pointer-events-none absolute -bottom-4 -right-3 h-20 w-20 text-paper/10" />
            <div className="relative">
              <p className="poster-kicker text-[9px] text-paper/80">
                Comissões geradas hoje
              </p>
              <p className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {brl(totalCommission)}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="border-2 border-paper/40 bg-brand-dark/40 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-paper/70">
                    Validados
                  </p>
                  <p className="mt-0.5 font-display text-lg font-bold">
                    {REFERRAL_HISTORY.length}
                  </p>
                </div>
                <div className="border-2 border-paper/40 bg-brand-dark/40 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-paper/70">Pagos</p>
                  <p className="mt-0.5 font-display text-lg font-bold">{paidCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border-2 border-ink bg-paper p-4 text-center shadow-[6px_6px_0_0_var(--color-ink)] sm:p-5">
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="stripes h-1.5 w-10 border border-ink/50" />
              <p className="poster-kicker text-[9px] text-ink/50">QR Code do cupom</p>
              <div className="stripes h-1.5 w-10 border border-ink/50" />
            </div>
            <div className="mt-3 inline-block border-2 border-ink bg-white p-2">
              <QrCode value={code || 'M-8921'} className="h-28 w-28" />
            </div>
            <p className="mt-2 font-display text-sm font-bold tracking-[0.2em]">
              {code.toUpperCase() || 'M-8921'}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-ink/40">
              Peça ao cliente para apresentar no balcão
            </p>
          </div>
        </section>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <div className="stripes h-3 flex-1 border-2 border-ink" />
        <p className="poster-kicker shrink-0 text-[9px] text-ink/50">
          Balcão · Cupom · Comissão
        </p>
        <div className="stripes h-3 flex-1 border-2 border-ink" />
      </div>
    </div>
  )
}
