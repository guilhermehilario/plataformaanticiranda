import { useState } from 'react'
import {
  COURSES,
  POINT_REWARDS,
  REPUTATION,
  TEMP_JOBS,
  VOLUNTEER_JOBS,
} from '../data/mock.js'
import { Icon, Star } from './Icons.jsx'
import { Modal } from './Modal.jsx'
import { useToast } from './Toast.jsx'

const VIEWS = [
  { id: 'treinamento', label: 'Treinamento', icon: 'book' },
  { id: 'temporarios', label: 'Vagas temporárias', icon: 'briefcase' },
  { id: 'voluntariado', label: 'Voluntariado', icon: 'heart' },
]

export function SupportPanel({ user }) {
  const toast = useToast()
  const [view, setView] = useState('treinamento')
  const [points, setPoints] = useState(REPUTATION.points)
  const [hours, setHours] = useState(REPUTATION.hours)
  const [progress, setProgress] = useState(() =>
    Object.fromEntries(COURSES.map((c) => [c.id, c.progress])),
  )
  const [applied, setApplied] = useState([])
  const [joined, setJoined] = useState([])
  const [rewardsOpen, setRewardsOpen] = useState(false)

  const nextLevelDistance = Math.max(REPUTATION.pointsToNext - (points - REPUTATION.points), 0)
  const reputationPct = Math.min(
    100,
    Math.round((points / (points + nextLevelDistance || 1)) * 100),
  )

  const startCourse = (course) => {
    const current = progress[course.id] ?? 0
    const next = current >= 100 ? 100 : Math.min(100, current + 25)
    setProgress((prev) => ({ ...prev, [course.id]: next }))
    toast(
      next >= 100
        ? `Curso “${course.title}” concluído! +30 pontos de reputação.`
        : `Aula registrada em “${course.title}” (${next}% concluído).`,
    )
    if (next >= 100) setPoints((p) => p + 30)
  }

  const applyJob = (job) => {
    if (applied.includes(job.id)) return
    setApplied((prev) => [...prev, job.id])
    toast(`Candidatura enviada para ${job.company}. Boa sorte!`)
  }

  const joinVolunteer = (job) => {
    if (joined.includes(job.id)) return
    setJoined((prev) => [...prev, job.id])
    setPoints((p) => p + job.points)
    setHours((h) => h + job.hours)
    toast(`Obrigado! +${job.points} pontos e +${job.hours}h de contribuição.`)
  }

  const redeem = (reward) => {
    if (points < reward.cost) {
      toast('Pontos insuficientes para este resgate.', 'error')
      return
    }
    setPoints((p) => p - reward.cost)
    toast(`Resgate confirmado: ${reward.title}.`)
  }

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-3">
        <div>
          <p className="poster-kicker flex items-center gap-1.5 text-[10px] text-brand">
            <Star className="h-2.5 w-2.5" /> Frente de apoio ao trabalhador
          </p>
          <h1 className="poster-heading mt-1.5 text-2xl sm:text-3xl">
            Apoio &amp; treinamento
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink/60">
            Capacitação gratuita, vagas temporárias e voluntariado que viram pontos de
            comunidade e reputação.
          </p>
        </div>
        <span className="poster-tag bg-ink text-paper">
          <Icon name="award" className="h-3.5 w-3.5 text-gold" /> {REPUTATION.level}
        </span>
      </div>

      {/* Cartão de reputação */}
      <section className="relative mt-5 overflow-hidden border-2 border-ink bg-brand text-paper shadow-[6px_6px_0_0_var(--color-ink)]">
        <div className="rays absolute inset-0" />
        <div className="relative grid gap-4 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-5 sm:p-6">
          <div>
            <p className="poster-kicker text-[9px] text-paper/80">
              Reputação de contribuidor · {user.nickname}
            </p>
            <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
              <p className="font-display text-3xl font-bold leading-none sm:text-4xl">
                {points} <span className="text-base sm:text-lg">pts</span>
              </p>
              <p className="font-display text-[11px] uppercase tracking-widest text-paper/75">
                {hours}h de contribuição · {REPUTATION.ranking}º de {REPUTATION.members}{' '}
                membros
              </p>
            </div>

            <div className="mt-3 max-w-md">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-paper/75">
                <span>{REPUTATION.level}</span>
                <span>{REPUTATION.nextLevel}</span>
              </div>
              <div className="mt-1 h-3 border-2 border-ink bg-brand-dark/60 p-0.5">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${reputationPct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-paper/80">
                Faltam{' '}
                <span className="font-semibold text-paper">{nextLevelDistance} pontos</span>{' '}
                para subir de nível.
              </p>
            </div>
          </div>

          <div className="sm:w-56">
            <div className="border-2 border-ink bg-paper p-3.5 text-ink">
              <p className="poster-kicker text-[9px] text-ink/50">Seus pontos</p>
              <p className="font-display text-2xl font-bold">{points}</p>
              <button
                onClick={() => setRewardsOpen(true)}
                className="poster-btn-dark mt-2 w-full px-2 py-2 text-[10px]"
              >
                <Icon name="ticket" className="h-3.5 w-3.5" />
                Trocar pontos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Abas internas */}
      <div className="no-scrollbar mt-6 flex overflow-x-auto border-2 border-ink">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`flex shrink-0 items-center justify-center gap-1.5 border-r-2 border-ink px-3 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] transition last:border-r-0 sm:flex-1 sm:gap-2 sm:px-4 sm:text-xs sm:tracking-widest ${
              view === v.id
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink/60 hover:bg-paper-dark hover:text-ink'
            }`}
          >
            <Icon name={v.icon} className="h-4 w-4 shrink-0" />
            {v.label}
          </button>
        ))}
      </div>

      {view === 'treinamento' && (
        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => {
            const p = progress[course.id] ?? 0
            return (
              <article
                key={course.id}
                className="flex flex-col border-2 border-ink bg-paper p-4 shadow-[5px_5px_0_0_var(--color-ink)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="poster-tag bg-brand text-paper">{course.tag}</span>
                  <span className="poster-kicker text-[9px] text-ink/40">{course.level}</span>
                </div>
                <h3 className="mt-2.5 font-display text-base font-semibold uppercase leading-tight tracking-wide">
                  {course.title}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-ink/45">
                  {course.instructor}
                </p>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ink/70">
                  {course.description}
                </p>

                <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-wider text-ink/50">
                  <span className="flex items-center gap-1">
                    <Icon name="clock" className="h-3.5 w-3.5" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="book" className="h-3.5 w-3.5" /> {course.lessons} aulas
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-ink/50">
                    <span>Progresso</span>
                    <span className="font-semibold text-ink">{p}%</span>
                  </div>
                  <div className="mt-1 h-2.5 border-2 border-ink bg-paper-dark p-0.5">
                    <div className="h-full bg-brand" style={{ width: `${p}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => startCourse(course)}
                  disabled={p >= 100}
                  className={`mt-3 w-full py-2.5 text-xs ${
                    p >= 100 ? 'poster-btn-ghost' : 'poster-btn-red'
                  }`}
                >
                  {p >= 100 ? (
                    <>
                      <Icon name="check" className="h-4 w-4" /> Concluído
                    </>
                  ) : p > 0 ? (
                    'Continuar curso'
                  ) : (
                    'Começar curso'
                  )}
                </button>
              </article>
            )
          })}
        </section>
      )}

      {view === 'temporarios' && (
        <section className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-ink/20 bg-paper-dark/60 px-3.5 py-2">
            <p className="poster-kicker text-[9px] text-ink/60">
              Diárias e freelas verificados pelos parceiros do bairro
            </p>
            <p className="poster-kicker text-[9px] text-ink/40">
              {TEMP_JOBS.length} vagas abertas
            </p>
          </div>

          {TEMP_JOBS.map((job) => {
            const done = applied.includes(job.id)
            return (
              <article
                key={job.id}
                className="flex flex-col gap-3 border-2 border-ink bg-paper p-4 shadow-[4px_4px_0_0_var(--color-ink)] sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="poster-tag bg-gold text-ink">{job.type}</span>
                    <span className="poster-kicker text-[9px] text-ink/40">
                      {job.slots} {job.slots === 1 ? 'vaga' : 'vagas'}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold uppercase leading-tight tracking-wide">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-ink/70">{job.company}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink/55">
                    <span className="flex items-center gap-1">
                      <Icon name="pin" className="h-3.5 w-3.5" /> {job.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="clock" className="h-3.5 w-3.5" /> {job.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] italic text-ink/45">Requisito: {job.requires}</p>
                  <p className="mt-2 inline-flex items-center gap-1 border border-ink/30 px-1.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wider text-brand">
                    <Star className="h-2.5 w-2.5" /> +{job.points} pts de reputação
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:w-40">
                  <div className="border-2 border-ink bg-paper-dark px-3 py-2 text-center">
                    <p className="poster-kicker text-[8px] text-ink/45">Remuneração</p>
                    <p className="font-display text-sm font-bold">{job.pay}</p>
                  </div>
                  <button
                    onClick={() => applyJob(job)}
                    disabled={done}
                    className={done ? 'poster-btn-ghost py-2 text-[10px]' : 'poster-btn-red py-2 text-[10px]'}
                  >
                    {done ? (
                      <>
                        <Icon name="check" className="h-3.5 w-3.5" /> Enviada
                      </>
                    ) : (
                      'Candidatar-se'
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      )}

      {view === 'voluntariado' && (
        <section className="mt-4">
          <div className="border-2 border-ink bg-ink px-4 py-2.5 text-paper">
            <p className="poster-kicker text-[9px] text-paper/80">
              Cada hora doada vira ponto: 2h = 40 pontos de comunidade
            </p>
          </div>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {VOLUNTEER_JOBS.map((job) => {
              const done = joined.includes(job.id)
              return (
                <article
                  key={job.id}
                  className="flex flex-col border-2 border-ink bg-paper p-4 shadow-[5px_5px_0_0_var(--color-ink)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="poster-tag bg-brand text-paper">
                      <Icon name="heart" className="h-3 w-3" /> {job.hours}h
                    </span>
                    <span className="poster-tag bg-gold text-ink">+{job.points} pts</span>
                  </div>
                  <h3 className="mt-2.5 font-display text-base font-semibold uppercase leading-tight tracking-wide">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-ink/45">
                    {job.org}
                  </p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink/70">
                    {job.description}
                  </p>
                  <div className="mt-2.5 space-y-1 text-[11px] text-ink/55">
                    <p className="flex items-center gap-1">
                      <Icon name="pin" className="h-3.5 w-3.5" /> {job.city}
                    </p>
                    <p className="flex items-center gap-1">
                      <Icon name="clock" className="h-3.5 w-3.5" /> {job.when} · {job.spots}{' '}
                      vagas
                    </p>
                  </div>
                  <button
                    onClick={() => joinVolunteer(job)}
                    disabled={done}
                    className={`mt-3 w-full py-2.5 text-xs ${
                      done ? 'poster-btn-ghost' : 'poster-btn-red'
                    }`}
                  >
                    {done ? (
                      <>
                        <Icon name="check" className="h-4 w-4" /> Participação confirmada
                      </>
                    ) : (
                      'Quero contribuir'
                    )}
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      )}

      <Modal
        open={rewardsOpen}
        onClose={() => setRewardsOpen(false)}
        title="Trocar pontos de comunidade"
        subtitle={`Você tem ${points} pontos disponíveis`}
      >
        <div className="relative overflow-hidden border-2 border-ink bg-brand p-4 text-paper">
          <div className="rays absolute inset-0" />
          <div className="relative flex items-end justify-between">
            <div>
              <p className="poster-kicker text-[9px] text-paper/80">Saldo de pontos</p>
              <p className="font-display text-3xl font-bold">{points}</p>
            </div>
            <p className="poster-kicker text-[9px] text-paper/80">{REPUTATION.level}</p>
          </div>
        </div>

        <ul className="mt-3 divide-y-2 divide-ink/10 border-2 border-ink">
          {POINT_REWARDS.map((reward) => {
            const affordable = points >= reward.cost
            return (
              <li
                key={reward.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 p-3"
              >
                <div className="min-w-0 flex-1 basis-[60%]">
                  <p className="font-display text-xs font-semibold uppercase tracking-wide">
                    {reward.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-ink/40">
                    {reward.type}
                  </p>
                </div>
                <span className="shrink-0 font-display text-xs font-bold text-brand">
                  {reward.cost} pts
                </span>
                <button
                  onClick={() => redeem(reward)}
                  disabled={!affordable}
                  className={`ml-auto shrink-0 px-2 py-1.5 text-[10px] ${
                    affordable ? 'poster-btn-dark' : 'poster-btn-ghost opacity-50'
                  }`}
                >
                  Resgatar
                </button>
              </li>
            )
          })}
        </ul>

        <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-ink/40">
          Pontos extras também vêm das indicações confirmadas na carteira
        </p>
      </Modal>
    </div>
  )
}
