# IndicaLocal

Protótipo web estático (React + Vite + Tailwind CSS) de uma plataforma de economia
colaborativa e marketing de indicação local, com apoio a quem procura emprego
(cursos, vagas temporárias e voluntariado revertido em pontos de comunidade).

Visual inspirado em folhetos de propaganda construtivista: vermelho de tinta,
papel creme, preto, tipografia condensada em caixa alta e sombras duras.

## Rodando localmente

```bash
npm install     # só na primeira vez
npm run dev     # http://localhost:5173
```

O servidor sobe em `0.0.0.0`, então também é acessível pela rede local
(ex.: `http://192.168.18.130:5173`) para testar no celular.

Outros comandos:

```bash
npm run build     # gera a versão estática em dist/
npm run preview   # serve a versão de produção em http://localhost:4173
```

## Usuário de teste

Já existe um usuário semeado nos mocks (`src/data/mock.js`) e o login aceita
tanto nickname quanto telefone:

| Campo     | Valor                                  |
| --------- | -------------------------------------- |
| Nickname  | `@joaosilva`                           |
| Telefone  | `(11) 99999-9999`                      |
| Senha     | `123456`                               |
| CPF       | `12345678909` (chave PIX do saque)     |

Na tela de login há também o atalho **"Preencher automaticamente"**.
A sessão é salva em `localStorage` (`indicalocal.session`), então recarregar a
página mantém o usuário logado — use **Sair da conta** no menu de perfil para
voltar à tela de autenticação. O cadastro cria um novo usuário local (a senha
fica só no navegador, é um mockup).

## O que testar

1. **Autenticação** — alterne entre login por Nickname, Telefone e SMS/2FA
   (código de 6 dígitos desabilitado, marcado como "em breve") e entre as abas
   Entrar / Criar conta.
2. **Dashboard** — busca na navbar, carrossel de categorias, cards de parceiro
   com desconto e comissão.
   - _Gerar Link de Indicação_ abre o modal com `plataforma.com/slug?ref=@nick`,
     botão Copiar e envio pelo WhatsApp.
   - _Pegar Desconto de Membro_ gera um cupom com QR Code e código de 6 dígitos.
3. **Minha Carteira** — métricas, histórico de indicações e saque via PIX
   (chave CPF), com confirmação simulada.
4. **Painel do Parceiro** — valide `M-8921` (ou qualquer cupom gerado no
   dashboard) ou use "Escanear QR Code da câmera" para ver o card de confirmação.
5. **Apoio & Vagas** — cursos com progresso, vagas temporárias (candidatura),
   voluntariado que soma horas e pontos de comunidade, e o modal "Trocar pontos"
   com resgates que descontam do saldo e sobem a reputação de contribuidor.

Todos os dados são fictícios e não há backend.
