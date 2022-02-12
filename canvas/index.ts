export type TCoord = {
  x: number,
  y: number
}

export type TReposition = {
  canvas?: HTMLCanvasElement
  coord?: TCoord,
  event: MouseEvent
  flag?: boolean
}

export type TDraw = {
  ctx?: CanvasRenderingContext2D | undefined | null
  event: MouseEvent
  coord: TCoord
}

let coord = {
  x: 0,
  y: 0
}

export function reposition({
  canvas,
  event
}: TReposition) {
  if (!canvas || !coord) return

  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;

  return coord
}

export function drawLine({ canvas, event }: TReposition) {
  if (!canvas) {
    return null
  }

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }
 
  
  ctx?.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#ACD3ED';

  ctx?.moveTo(coord.x, coord.y);
  
  reposition({ canvas, event });

  ctx?.lineTo(coord.x, coord.y);
  ctx?.stroke();
}

export function resize(ctx: any) {
  if (!ctx?.width) return
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;
}

export function start({ canvas, event }: TReposition) {
  document.addEventListener('mousemove', (event) => drawLine({ canvas, event }));
  reposition({ canvas, event });
}
