import { Result } from '@zxing/library'
import { ReactElement, useEffect, useRef } from 'react'

type TrackerProps = {
  result?: Result
  video: HTMLVideoElement | null
  delay: number
  getSettings?: () => MediaTrackSettings | undefined
}

const Tracker = ({
  result,
  video,
  delay,
  getSettings
}: TrackerProps): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (
      video === null ||
      result === undefined ||
      canvasRef.current === null ||
      result.getBarcodeFormat() !== 11
    ) {
      return
    }

    const device: MediaTrackSettings = getSettings?.() ?? {}

    if (device === undefined || device.width === undefined) {
      return
    }

    const scaleFactor = device.width / video.clientWidth

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    if (ctx === null) {
      return
    }

    const timer = setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }, delay)

    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)'
    ctx.lineWidth = 4

    // Bottom left
    const point0 = result.getResultPoints()[0] as unknown as {
      getX: () => number
      getY: () => number
      estimatedModuleSize: number
    }

    ctx.beginPath()
    ctx.arc(
      point0.getX() / scaleFactor,
      point0.getY() / scaleFactor,
      point0.estimatedModuleSize,
      0,
      2 * Math.PI
    )
    ctx.stroke()
    ctx.closePath()

    // Top left
    const point1 = result.getResultPoints()[1] as unknown as {
      getX: () => number
      getY: () => number
      estimatedModuleSize: number
    }

    ctx.beginPath()
    ctx.arc(
      point1.getX() / scaleFactor,
      point1.getY() / scaleFactor,
      point1.estimatedModuleSize,
      0,
      2 * Math.PI
    )
    ctx.stroke()
    ctx.closePath()

    // Top right
    const point2 = result.getResultPoints()[2] as unknown as {
      getX: () => number
      getY: () => number
      estimatedModuleSize: number
    }

    ctx.beginPath()
    ctx.arc(
      point2.getX() / scaleFactor,
      point2.getY() / scaleFactor,
      point2.estimatedModuleSize,
      0,
      2 * Math.PI
    )
    ctx.stroke()
    ctx.closePath()

    // Bottom right
    if (result.getResultPoints().length >= 4) {
      const point3 = result.getResultPoints()[3] as unknown as {
        getX: () => number
        getY: () => number
        estimatedModuleSize: number
      }

      ctx.beginPath()
      ctx.arc(
        point3.getX() / scaleFactor,
        point3.getY() / scaleFactor,
        point3.estimatedModuleSize,
        0,
        2 * Math.PI
      )
      ctx.stroke()
      ctx.closePath()
    }

    return () => clearTimeout(timer)
  })

  return (
    <canvas
      ref={canvasRef}
      width={video?.clientWidth ?? 0}
      height={video?.clientHeight ?? 0}
      style={{ position: 'absolute', top: 0, zIndex: 2 }}
    />
  )
}

export default Tracker