import { useEffect, useState } from 'react'
import { AuthScreen } from './components/AuthScreen.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import { Navbar } from './components/Navbar.jsx'
import { PartnerPanel } from './components/PartnerPanel.jsx'
import { SupportPanel } from './components/SupportPanel.jsx'
import { ToastProvider, useToast } from './components/Toast.jsx'
import { WalletPanel } from './components/WalletPanel.jsx'
import { PARTNERS } from './data/mock.js'

const STORAGE_KEY = 'indicalocal.session'

function AppShell() {
  const toast = useToast()
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [tab, setTab] = useState('inicio')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('todos')
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const handleLogin = (u) => {
    setUser(u)
    setTab('inicio')
    toast(`Olá, ${u.nickname}! Bom te ver por aqui.`)
  }

  const handleSignup = (u) => {
    setUser(u)
    setTab('inicio')
    toast(`Conta criada com sucesso. Bem-vindo, ${u.nickname}!`)
  }

  // Gera um cupom de desconto para o parceiro, reaproveitando o código
  // já existente para o mesmo parceiro.
  const generateCoupon = (partner) => {
    const existing = coupons.find((c) => c.partnerId === partner.id)
    if (existing) return existing
    const code = `M-${Math.floor(1000 + Math.random() * 9000)}`
    const coupon = {
      code,
      partnerId: partner.id,
      partner: partner.name,
      holder: user?.nickname ?? '@visitante',
      discount: partner.discount,
      commission: partner.commission,
      referrer: user?.nickname ?? '@joaosilva',
      valid: true,
    }
    setCoupons((prev) => [coupon, ...prev])
    toast(`Cupom ${code} gerado para ${partner.name}.`)
    return coupon
  }

  if (!user) {
    return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar
        user={user}
        activeTab={tab}
        onTabChange={setTab}
        search={search}
        onSearch={setSearch}
        onLogout={() => {
          setUser(null)
          setTab('inicio')
          setSearch('')
          setCategory('todos')
        }}
      />

      <main className="pb-16">
        {tab === 'inicio' && (
          <Dashboard
            user={user}
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            onGenerateCoupon={generateCoupon}
            onGoWallet={() => setTab('carteira')}
          />
        )}
        {tab === 'carteira' && <WalletPanel user={user} />}
        {tab === 'parceiro' && <PartnerPanel coupons={coupons} />}
        {tab === 'apoio' && <SupportPanel user={user} />}
      </main>

      <footer className="border-t-4 border-ink bg-ink py-4 text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-3 text-center sm:flex-row sm:px-6 sm:text-left">
          <p className="poster-kicker text-[9px] text-paper/70">
            IndicaLocal © 2026 · Protótipo de economia colaborativa — dados fictícios ·
            parceiros: {PARTNERS.length}
          </p>
          <div className="flex items-center gap-2">
            <div className="stripes h-2 w-8" />
            <p className="poster-kicker text-[9px] text-paper/50">
              React + Tailwind CSS
            </p>
            <div className="stripes h-2 w-8" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  )
}
