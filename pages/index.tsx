import type { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { start, stop, resize, drawLine, reposition } from '../canvas'

const canvasUseStateCallback = () => {
  if (typeof window !== 'undefined') {
    const canvas = document.getElementById('canva') as HTMLCanvasElement
    return canvas
  }
}


const Home: NextPage = () => {
  const [canvas, setCanvas] = useState(canvasUseStateCallback)
  
  const ctx = canvas?.getContext('2d')

  const handleDraw = useCallback((event: any) => {
    drawLine({ event, canvas })
    reposition({ event, canvas });
  }, [canvas])

  useEffect(() => {
    const handleReposition = (event: any) => {   
      reposition({ event, canvas });
      document.addEventListener('mousemove', handleDraw);
    }
  
    document.addEventListener('mousedown', handleReposition);
  
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleDraw);
    });
  
    window.addEventListener('resize', () => resize(ctx));

    return () => {
      document.removeEventListener('mousemove', handleReposition)
      document.addEventListener('mousedown', handleReposition);
      document.addEventListener('mouseup', handleDraw);
      window.removeEventListener('mousemove', resize)
    }
  }, [canvas, ctx, handleDraw]) 

  return (
    <div>
      <h1>Guess the draw</h1>
      <canvas
        id='canva'
        width={500}
        height={500}
        style={{ border: '1px solid red' }}
      />
    </div>
  )
}

export default Home
