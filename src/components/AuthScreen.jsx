import { useState } from "react";
import { TEST_USER } from "../data/mock.js";
import { Icon, Logo, Star } from "./Icons.jsx";

const LOGIN_MODES = [
  { id: "nickname", label: "Nickname", icon: "user" },
  { id: "phone", label: "Telefone", icon: "phone" },
  { id: "2fa", label: "SMS / 2FA", icon: "shield" },
];

export function AuthScreen({ onLogin, onSignup }) {
  const [view, setView] = useState("login"); // login | signup
  const [mode, setMode] = useState("nickname");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [login, setLogin] = useState({
    identifier: "",
    password: "",
    code: "",
  });
  const [signup, setSignup] = useState({
    name: "",
    nickname: "",
    phone: "",
    cpf: "",
    password: "",
  });

  const onlyDigits = (v) => v.replace(/\D/g, "");

  const maskPhone = (v) => {
    const d = onlyDigits(v).slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const switchMode = (id) => {
    setMode(id);
    setError("");
    setLogin((prev) => ({ ...prev, identifier: "", password: "", code: "" }));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (mode === "2fa") {
      setInfo(
        "🔒 Autenticação por SMS/App ainda não está disponível neste protótipo. Use Nickname + Senha.",
      );
      return;
    }

    const raw = login.identifier.trim().toLowerCase();
    const digits = onlyDigits(login.identifier);

    const matches =
      mode === "nickname"
        ? raw.replace(/^@/, "") === TEST_USER.nickname.replace("@", "")
        : digits.length >= 10 && digits === TEST_USER.phoneDigits;

    if (!matches) {
      setError(
        mode === "nickname"
          ? "Nickname não encontrado. Tente @joaosilva."
          : "Telefone não cadastrado. Tente (11) 99999-9999.",
      );
      return;
    }
    if (login.password !== TEST_USER.password) {
      setError("Senha incorreta. A senha do usuário de teste é 123456.");
      return;
    }
    onLogin(TEST_USER);
  };

  const submitSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!signup.name.trim()) return setError("Informe seu nome completo.");
    if (!/^@[a-z0-9_.]{3,}$/i.test(signup.nickname.trim()))
      return setError(
        "Nickname inválido. Use o formato @seunome (mín. 3 caracteres).",
      );
    if (onlyDigits(signup.phone).length < 10)
      return setError("Telefone/WhatsApp inválido. Use (11) 99999-9999.");
    if (onlyDigits(signup.cpf).length !== 11)
      return setError(
        "CPF deve conter 11 números (usado para validação fiscal e saques).",
      );
    if (signup.password.length < 6)
      return setError("A senha deve ter no mínimo 6 caracteres.");

    onSignup({
      ...TEST_USER,
      id: `u-${Date.now()}`,
      name: signup.name.trim(),
      nickname: signup.nickname.startsWith("@")
        ? signup.nickname.trim().toLowerCase()
        : `@${signup.nickname.trim().toLowerCase()}`,
      phone: maskPhone(signup.phone),
      phoneDigits: onlyDigits(signup.phone),
      cpf: onlyDigits(signup.cpf),
      password: signup.password,
      status: "Novo Membro",
      avatar: signup.name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase(),
    });
  };

  const fillTestUser = () => {
    setView("login");
    setMode("nickname");
    setError("");
    setInfo('Usuário de demonstração preenchido — clique em "Entrar".');
    setLogin({ identifier: "@joaosilva", password: "123456", code: "" });
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b-4 border-ink bg-brand px-4 py-2 text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="poster-kicker flex items-center gap-1.5 text-[10px]">
            <Star className="h-2.5 w-2.5" /> Órgão oficial do coletivo de
            anti-ciranda
          </p>
          <p className="poster-kicker hidden text-[10px] sm:block">
            Edição nº 07 · Novembro de 2026
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-6 px-3 py-6 sm:gap-8 sm:px-4 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-12">
        <div className="animate-fade-in">
          <Logo />
          <h1 className="poster-heading mt-5 text-[2.1rem] sm:mt-7 sm:text-5xl lg:text-[3.4rem]">
            Indicação
            <br />é <span className="text-brand">poder</span>
            <br />
            popular
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="stripes h-3 w-24 border-2 border-ink" />
            <p className="poster-kicker text-[10px] text-ink/60">
              Pão · Desconto · Comissão
            </p>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/75">
            Descontos exclusivos nos comércios do seu bairro e comissão em
            dinheiro por cada indicação que fecha negócio. O bairro produz, o
            bairro recebe.
          </p>

          <div className="mt-7 hidden lg:block">
            <div className="relative overflow-hidden border-2 border-ink bg-brand p-5 text-paper shadow-[6px_6px_0_0_var(--color-ink)]">
              <div className="rays absolute inset-0" />
              <div className="relative">
                <Star className="h-10 w-10 text-gold" />
                <p className="poster-heading mt-3 max-w-sm text-2xl">
                  Todo indicação convertida é um tijolo na obra do bairro.
                </p>
                <p className="mt-3 font-display text-[10px] uppercase tracking-[0.3em] text-paper/80">
                  Coletivo IndicaLocal · Mauá, SP
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-7 hidden space-y-2 lg:block">
            {[
              [
                "01",
                "Desconto de membro",
                "Economize em oficinas, salões, mercados e mais.",
              ],
              [
                "02",
                "Comissão por indicação",
                "Receba via PIX a cada indicação convertida.",
              ],
              ["03", "Cupom e QR Code", "Valide o benefício direto no balcão."],
            ].map(([num, title, desc]) => (
              <li
                key={num}
                className="flex gap-3 border-2 border-ink bg-paper px-3 py-2.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center border-2 border-ink bg-ink font-display text-xs font-bold text-paper">
                  {num}
                </span>
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-widest">
                    {title}
                  </p>
                  <p className="text-xs text-ink/60">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Cartão de autenticação */}
        <div className="animate-fade-in mx-auto w-full max-w-md lg:max-w-none">
          <div className="border-2 border-ink bg-paper shadow-[8px_8px_0_0_var(--color-ink)]">
            <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2.5 text-paper">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em]">
                Acesso do membro
              </p>
              <Star className="h-4 w-4 text-gold" />
            </div>

            <div className="flex gap-0">
              {[
                { id: "login", label: "Entrar" },
                { id: "signup", label: "Alistar-se" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setView(t.id);
                    setError("");
                    setInfo("");
                  }}
                  className={`flex-1 border-b-2 border-ink py-2.5 font-display text-xs font-semibold uppercase tracking-widest transition ${
                    view === t.id
                      ? "bg-brand text-paper"
                      : "bg-paper-dark text-ink/60 hover:bg-paper-dark/70 hover:text-ink"
                  } ${t.id === "login" ? "border-r-2" : ""}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6">
              {view === "login" ? (
                <form onSubmit={submitLogin} className="space-y-4">
                  <div>
                    <h2 className="poster-heading text-2xl">
                      Bem-vindo, camarada
                    </h2>
                    <p className="mt-1 text-xs text-ink/60">
                      Escolha como preferir acessar sua conta.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {LOGIN_MODES.map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => switchMode(m.id)}
                        className={`flex flex-col items-center gap-1 border-2 border-ink px-1 py-2 font-display text-[10px] font-semibold uppercase tracking-wider transition ${
                          mode === m.id
                            ? "bg-brand text-paper shadow-[3px_3px_0_0_var(--color-ink)]"
                            : "bg-paper text-ink/60 hover:bg-paper-dark hover:text-ink"
                        }`}
                      >
                        <Icon name={m.icon} className="h-4 w-4" />
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {mode === "2fa" ? (
                    <div className="space-y-3">
                      <div className="border-2 border-ink bg-gold/40 px-3 py-2 text-[11px] font-medium text-ink">
                        (Em breve: Autenticação via App/SMS)
                      </div>
                      <Field label="Código de 6 dígitos" htmlFor="code">
                        <input
                          id="code"
                          inputMode="numeric"
                          maxLength={6}
                          value={login.code}
                          onChange={(e) =>
                            setLogin({
                              ...login,
                              code: onlyDigits(e.target.value).slice(0, 6),
                            })
                          }
                          placeholder="000000"
                          className={`${inputBase} text-center font-display text-xl font-semibold tracking-[0.5em]`}
                          disabled
                        />
                      </Field>
                      <button
                        type="button"
                        disabled
                        className="w-full border-2 border-ink bg-paper-dark py-3 font-display text-xs font-semibold uppercase tracking-widest text-ink/40"
                      >
                        Validar código
                      </button>
                    </div>
                  ) : (
                    <>
                      <Field
                        label={
                          mode === "nickname"
                            ? "Nickname"
                            : "Telefone / WhatsApp"
                        }
                        htmlFor="identifier"
                      >
                        <div className="relative">
                          <Icon
                            name={mode === "nickname" ? "user" : "phone"}
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45"
                          />
                          <input
                            id="identifier"
                            value={login.identifier}
                            onChange={(e) =>
                              setLogin({
                                ...login,
                                identifier:
                                  mode === "phone"
                                    ? maskPhone(e.target.value)
                                    : e.target.value,
                              })
                            }
                            placeholder={
                              mode === "nickname"
                                ? "@joaosilva"
                                : "(11) 99999-9999"
                            }
                            autoComplete="username"
                            className={`${inputBase} pl-9`}
                          />
                        </div>
                      </Field>

                      <Field label="Senha" htmlFor="password">
                        <div className="relative">
                          <Icon
                            name="lock"
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/45"
                          />
                          <input
                            id="password"
                            type="password"
                            value={login.password}
                            onChange={(e) =>
                              setLogin({ ...login, password: e.target.value })
                            }
                            placeholder="••••••"
                            autoComplete="current-password"
                            className={`${inputBase} pl-9`}
                          />
                        </div>
                      </Field>

                      <button
                        type="submit"
                        className="poster-btn-red w-full py-3"
                      >
                        Entrar
                      </button>
                    </>
                  )}

                  {error && (
                    <p className="border-2 border-ink bg-brand/10 px-3 py-2 text-xs font-semibold text-brand">
                      {error}
                    </p>
                  )}
                  {info && (
                    <p className="border-2 border-ink bg-gold/30 px-3 py-2 text-xs font-semibold text-ink">
                      {info}
                    </p>
                  )}

                  <div className="border-2 border-dashed border-ink bg-paper-dark/60 p-3">
                    <p className="poster-kicker flex items-center gap-1 text-[10px]">
                      <Star className="h-2.5 w-2.5 text-brand" /> Usuário de
                      teste
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                      <code className="border border-ink/30 bg-paper px-1 font-mono text-[11px]">
                        @joaosilva
                      </code>{" "}
                      ou{" "}
                      <code className="border border-ink/30 bg-paper px-1 font-mono text-[11px]">
                        (11) 99999-9999
                      </code>
                      <br />
                      senha{" "}
                      <code className="border border-ink/30 bg-paper px-1 font-mono text-[11px]">
                        123456
                      </code>
                    </p>
                    <button
                      type="button"
                      onClick={fillTestUser}
                      className="mt-2 font-display text-[10px] font-semibold uppercase tracking-widest text-brand underline decoration-2 underline-offset-2 hover:text-brand-dark"
                    >
                      Preencher automaticamente
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={submitSignup} className="space-y-3.5">
                  <div>
                    <h2 className="poster-heading text-2xl">
                      Aliste-se ao coletivo
                    </h2>
                    <p className="mt-1 text-xs text-ink/60">
                      Seu nickname é o seu identificador público.
                    </p>
                  </div>

                  <Field label="Nome completo" htmlFor="name">
                    <input
                      id="name"
                      value={signup.name}
                      onChange={(e) =>
                        setSignup({ ...signup, name: e.target.value })
                      }
                      placeholder="João da Silva"
                      className={inputBase}
                    />
                  </Field>

                  <Field
                    label="Nickname único"
                    htmlFor="nickname"
                    hint="Ex: @joaosilva"
                  >
                    <input
                      id="nickname"
                      value={signup.nickname}
                      onChange={(e) =>
                        setSignup({ ...signup, nickname: e.target.value })
                      }
                      placeholder="@joaosilva"
                      className={inputBase}
                    />
                  </Field>

                  <Field
                    label="Telefone / WhatsApp"
                    htmlFor="signup-phone"
                    hint="Vínculo obrigatório"
                  >
                    <input
                      id="signup-phone"
                      value={signup.phone}
                      onChange={(e) =>
                        setSignup({
                          ...signup,
                          phone: maskPhone(e.target.value),
                        })
                      }
                      placeholder="(11) 99999-9999"
                      inputMode="tel"
                      className={inputBase}
                    />
                  </Field>

                  <Field
                    label="CPF"
                    htmlFor="cpf"
                    hint="Apenas números — saques"
                  >
                    <input
                      id="cpf"
                      value={signup.cpf}
                      onChange={(e) =>
                        setSignup({
                          ...signup,
                          cpf: onlyDigits(e.target.value).slice(0, 11),
                        })
                      }
                      placeholder="00000000000"
                      inputMode="numeric"
                      className={inputBase}
                    />
                  </Field>

                  <Field
                    label="Senha"
                    htmlFor="signup-password"
                    hint="Mín. 6 caracteres"
                  >
                    <input
                      id="signup-password"
                      type="password"
                      value={signup.password}
                      onChange={(e) =>
                        setSignup({ ...signup, password: e.target.value })
                      }
                      placeholder="••••••"
                      className={inputBase}
                    />
                  </Field>

                  {error && (
                    <p className="border-2 border-ink bg-brand/10 px-3 py-2 text-xs font-semibold text-brand">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="poster-btn-red w-full py-3">
                    Criar conta e entrar
                  </button>
                  <p className="text-center text-[10px] leading-relaxed text-ink/45">
                    Ao continuar você aceita os termos de uso e a política de
                    privacidade. Protótipo — não insira dados reais.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-ink/45">
            <div className="stripes h-2 w-10 border border-ink/40" />
            <p className="poster-kicker text-[9px]">
              Economia colaborativa de bairro
            </p>
            <div className="stripes h-2 w-10 border border-ink/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

const inputBase = "poster-input";

function Field({ label, htmlFor, hint, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="poster-label">
          {label}
        </label>
        {hint && (
          <span className="text-[10px] uppercase tracking-wider text-ink/40">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
