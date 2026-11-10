import { useState } from 'react'
import { Icon, Star } from './Icons.jsx'
import { Modal } from './Modal.jsx'
import { QrCode } from './QrCode.jsx'
import { useToast } from './Toast.jsx'

export function PartnerCard({ partner, user, onGenerateCoupon }) {
  const [modal, setModal] = useState(null) // 'referral' | 'discount'
  const toast = useToast()

  const referralLink = `plataforma.com/${partner.slug}?ref=${user.nickname}`
  const fullLink = `https://${referralLink}`
  const [coupon, setCoupon] = useState(null)

  const copyText = async (text, message) => {
    try {
      await navigator.clipboard.writeText(text)
      toast(message)
    } catch {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      toast(message)
    }
  }

  const openDiscount = () => {
    const generated = onGenerateCoupon(partner)
    setCoupon(generated)
    setModal('discount')
  }

  const whatsappText = encodeURIComponent(
    `Oi! Usa meu link no ${partner.name} e ganha ${partner.discount}% de desconto: ${fullLink}`,
  )

  return (
    <>
      <article className="group flex flex-col border-2 border-ink bg-paper shadow-[5px_5px_0_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-ink)]">
        <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink bg-ink">
          <img
            src={partner.image}
            alt={partner.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale contrast-125 transition duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-brand opacity-60 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 border-2 border-ink bg-paper px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-widest text-ink">
            {partner.category}
          </span>
          <span className="absolute right-3 top-3 flex items-center gap-1 border-2 border-ink bg-paper px-2 py-0.5 font-display text-[10px] font-bold text-ink">
            <Star className="h-2.5 w-2.5 text-brand" />
            {partner.rating.toString().replace('.', ',')}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[15px] font-semibold uppercase leading-tight tracking-wide sm:text-base">
              {partner.name}
            </h3>
            <span className="shrink-0 border border-ink/30 px-1.5 py-0.5 text-[10px] text-ink/60">
              {partner.distance}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1 text-xs text-ink/60">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {partner.city}
          </p>

          <p className="mt-2 line-clamp-1 text-xs italic text-ink/50">{partner.highlight}</p>

          <div className="mt-3 flex flex-nowrap items-center gap-1.5">
            <p className="poster-tag shrink-0 whitespace-nowrap bg-brand px-1.5 text-[10px] text-paper">
              🏷️ {partner.discount}% OFF
            </p>
            <p className="poster-tag shrink-0 whitespace-nowrap bg-gold px-1.5 text-[10px] text-ink">
              💸 R$ {partner.commission.toFixed(2).replace('.', ',')}/indicação
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 pt-1">
            <button
              onClick={() => setModal('referral')}
              className="poster-btn-red w-full"
            >
              <Icon name="link" className="h-4 w-4" />
              Gerar link de indicação
            </button>
            <button
              onClick={openDiscount}
              className="poster-btn-ghost w-full"
            >
              <Icon name="qr" className="h-4 w-4" />
              Desconto de membro
            </button>
          </div>
        </div>
      </article>

      {/* Modal: link de indicação */}
      <Modal
        open={modal === 'referral'}
        onClose={() => setModal(null)}
        title="Seu link de indicação"
        subtitle={`${partner.name} · ${partner.discount}% OFF para quem usar`}
      >
        <div className="relative overflow-hidden border-2 border-ink bg-brand p-4 text-paper">
          <div className="rays absolute inset-0" />
          <div className="relative">
            <p className="poster-kicker text-[9px] text-paper/80">Comissão por indicação</p>
            <p className="mt-1 font-display text-3xl font-bold">
              R$ {partner.commission.toFixed(2).replace('.', ',')}
            </p>
            <p className="mt-1 text-[11px] text-paper/80">
              Creditado na sua carteira quando o parceiro confirmar a indicação.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <label className="poster-label">Link personalizado</label>
          <div className="mt-1.5 flex items-stretch gap-0 border-2 border-ink">
            <span className="flex-1 truncate bg-paper px-3 py-2.5 font-mono text-xs text-ink/70">
              {referralLink}
            </span>
            <button
              onClick={() => copyText(fullLink, 'Link copiado para a área de transferência!')}
              className="flex shrink-0 items-center gap-1.5 border-l-2 border-ink bg-ink px-3 font-display text-[11px] font-semibold uppercase tracking-widest text-paper transition hover:bg-brand"
            >
              <Icon name="copy" className="h-3.5 w-3.5" />
              Copiar
            </button>
          </div>
        </div>

        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 border-2 border-ink bg-[#25D366] py-3 font-display text-sm font-semibold uppercase tracking-widest text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Enviar no WhatsApp
        </a>

        <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-ink/40">
          Quem comprar pelo link garante o desconto e você recebe a comissão.
        </p>
      </Modal>

      {/* Modal: desconto de membro + QR */}
      <Modal
        open={modal === 'discount'}
        onClose={() => setModal(null)}
        title="Desconto de membro"
        subtitle="Apresente no balcão do parceiro"
      >
        <div className="border-2 border-ink bg-paper-dark p-5 text-center">
          <div className="inline-block border-2 border-ink bg-white p-2">
            <QrCode value={coupon?.code ?? 'M-0000'} className="h-36 w-36" />
          </div>
          <p className="poster-kicker mt-3 text-[9px] text-ink/50">Código de uso presencial</p>
          <p className="mt-1 font-display text-3xl font-bold tracking-[0.2em] text-ink">
            {coupon?.code ?? 'M-0000'}
          </p>
          <p className="poster-tag mt-2 border-ink bg-brand text-paper">
            {partner.discount}% OFF em {partner.name}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-2 border-ink px-3 py-2">
          <span className="poster-kicker text-[9px] text-ink/50">Válido até</span>
          <span className="font-display text-xs font-semibold uppercase tracking-widest">
            {new Date(Date.now() + 7 * 864e5).toLocaleDateString('pt-BR')} · 7 dias
          </span>
        </div>

        <button
          onClick={() => copyText(coupon?.code ?? '', 'Código do cupom copiado!')}
          className="poster-btn-dark mt-3 w-full py-3"
        >
          <Icon name="copy" className="h-4 w-4" />
          Copiar código
        </button>
        <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-ink/40">
          O lojista valida este código no Painel do Parceiro.
        </p>
      </Modal>
    </>
  )
}
