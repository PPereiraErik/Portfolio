/** Curva usada em quase todas as transições: sai rápido, assenta devagar */
export const easeOut = [0.2, 0.7, 0, 1] as const

/** Easing em degraus: faz a imagem "renderizar" em linhas, como um monitor 1-bit */
export const steppedEase = (steps: number) => (t: number) => Math.floor(t * steps) / steps
