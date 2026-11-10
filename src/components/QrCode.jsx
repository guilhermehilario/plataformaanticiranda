// QR Code "estático" gerado a partir de um hash simples do texto.
// Serve apenas para o mockup — não é um QR verificável.
function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function buildMatrix(text, size = 25) {
  let seed = hashString(text)
  const rand = () => {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    seed >>>= 0
    return seed / 4294967295
  }

  const matrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => rand() > 0.52),
  )

  const finder = (row, col) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4
        matrix[row + r][col + c] = edge || core
      }
    }
    // margem branca ao redor do marcador
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = row + r
        const cc = col + c
        if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue
        if (r === -1 || r === 7 || c === -1 || c === 7) matrix[rr][cc] = false
      }
    }
  }

  finder(0, 0)
  finder(0, size - 7)
  finder(size - 7, 0)

  return matrix
}

export function QrCode({ value = 'M-8921', className = 'h-40 w-40' }) {
  const size = 25
  const matrix = buildMatrix(value, size)
  const cell = 100 / size

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`QR Code do cupom ${value}`}
      shapeRendering="crispEdges"
    >
      <rect width="100" height="100" fill="#fff" />
      {matrix.map((row, r) =>
        row.map((on, c) =>
          on ? (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell}
              height={cell}
              fill="#18181b"
            />
          ) : null,
        ),
      )}
    </svg>
  )
}
