import { memo, useMemo } from 'react'
import type { Bitmap } from '../lib/bitmaps'

const palette: Record<string, string> = {
  '#': 'currentColor',
  o: 'var(--color-signal)',
  W: '#ffffff',
  B: '#000000',
}

type PixelArtProps = {
  bitmap: Bitmap
  /** Tamanho de cada pixel em px */
  scale?: number
  className?: string
}

/** Desenha um bitmap como SVG nítido (sem suavização), em qualquer escala */
export const PixelArt = memo(function PixelArt({ bitmap, scale = 2, className = '' }: PixelArtProps) {
  const { width, height, rects } = useMemo(() => {
    const cells: { x: number; y: number; fill: string }[] = []
    bitmap.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const fill = palette[row[x]]
        if (fill) cells.push({ x, y, fill })
      }
    })
    return {
      width: Math.max(...bitmap.map((row) => row.length)),
      height: bitmap.length,
      rects: cells,
    }
  }, [bitmap])

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      className={`shrink-0 ${className}`}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={1} height={1} fill={r.fill} />
      ))}
    </svg>
  )
})
