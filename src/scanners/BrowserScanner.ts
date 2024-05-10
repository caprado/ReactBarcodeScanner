import { ArgumentException, BinaryBitmap, ChecksumException, DecodeContinuouslyCallback, Exception, FormatException, HybridBinarizer, NotFoundException, Reader, Result } from '@zxing/library'
import { ScannerControls, ScannerOptions } from '../types'
import { HTMLVisualMediaElement } from '../types/HTMLVisualMediaElement'
import { canEnumerateDevices, hasNavigator } from '../utilities/browser'
import { HTMLCanvasElementLuminanceSource } from './HTMLCanvasElementLuminanceSource'

export class BrowserScanner {
  private static streamTracker: MediaStream[] = []

  public constructor(
    protected readonly reader: Reader,
    public readonly options: ScannerOptions
  ) {
    if (!reader) {
      throw new ArgumentException('A valid Reader must be provided.')
    }
  }

  public static addVideoSource(videoElement: HTMLVideoElement, stream: MediaStream): void {
    try {
      videoElement.srcObject = stream
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Got interrupted by new loading request')
    }
  }

  public static async mediaStreamSetTorch(track: MediaStreamTrack, onOff: boolean): Promise<void> {
    await track.applyConstraints({
      advanced: [
        {
          fillLightMode: onOff ? 'flash' : 'off',
          torch: onOff
        } as MediaTrackConstraints
      ]
    })
  }

  public static mediaStreamIsTorchCompatible(params: MediaStream): boolean {
    const tracks = params.getVideoTracks()

    for (const track of tracks) {
      if (BrowserScanner.mediaStreamIsTorchCompatibleTrack(track)) {
        return true
      }
    }

    return false
  }

  public static mediaStreamIsTorchCompatibleTrack(track: MediaStreamTrack): boolean {
    try {
      const capabilities = track.getCapabilities()

      return 'torch' in capabilities
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      // eslint-disable-next-line no-console
      console.warn('Your browser may be not fully compatible with WebRTC and/or ImageCapture specs. Torch will not be available.')

      return false
    }
  }

  public static isVideoPlaying(video: HTMLVideoElement): boolean {
    return video.currentTime > 0 && !video.paused && video.readyState > 2
  }

  public static getMediaElement(mediaElementId: string, type: string): HTMLVisualMediaElement {
    const mediaElement = document.getElementById(mediaElementId)

    if (!mediaElement) {
      throw new ArgumentException(`element with id '${mediaElementId}' not found`)
    }

    if (mediaElement.nodeName.toLowerCase() !== type.toLowerCase()) {
      throw new ArgumentException(`element with id '${mediaElementId}' must be an ${type} element`)
    }

    return mediaElement as HTMLVisualMediaElement
  }

  public static createVideoElement(videoThingy?: HTMLVideoElement | string): HTMLVideoElement {
    if (videoThingy instanceof HTMLVideoElement) {
      return videoThingy
    }

    if (typeof videoThingy === 'string') {
      return BrowserScanner.getMediaElement(videoThingy, 'video') as HTMLVideoElement
    }

    if (!videoThingy && typeof document !== 'undefined') {
      const videoElement = document.createElement('video')
      videoElement.width = 200
      videoElement.height = 200

      return videoElement
    }

    throw new Error('Couldn\'t get videoElement from videoSource!')
  }

  public static prepareVideoElement(videoElem?: HTMLVideoElement | string): HTMLVideoElement {
    const videoElement = BrowserScanner.createVideoElement(videoElem)

    // Needed for iOS 11
    videoElement.setAttribute('autoplay', 'true')
    videoElement.setAttribute('muted', 'true')
    videoElement.setAttribute('playsinline', 'true')

    return videoElement
  }

  public static createBinaryBitmapFromCanvas(canvas: HTMLCanvasElement): BinaryBitmap {
    const luminanceSource = new HTMLCanvasElementLuminanceSource(canvas)
    const hybridBinarizer = new HybridBinarizer(luminanceSource)

    return new BinaryBitmap(hybridBinarizer)
  }

  public static drawImageOnCanvas(
    canvasElementContext: CanvasRenderingContext2D,
    srcElement: HTMLVisualMediaElement
  ): void {
    canvasElementContext.drawImage(srcElement, 0, 0)
  }

  public static getMediaElementDimensions(mediaElement: HTMLVisualMediaElement): {
    height: number
    width: number
  } {
    if (mediaElement instanceof HTMLVideoElement) {
      return {
        height: mediaElement.videoHeight,
        width: mediaElement.videoWidth
      }
    }

    if (mediaElement instanceof HTMLImageElement) {
      return {
        height: mediaElement.naturalHeight || mediaElement.height,
        width: mediaElement.naturalWidth || mediaElement.width
      }
    }

    throw new Error('Couldn\'t find the Source\'s dimensions!')
  }

  public static createCaptureCanvas(mediaElement: HTMLVisualMediaElement): HTMLCanvasElement {
    if (!mediaElement) {
      throw new ArgumentException('Cannot create a capture canvas without a media element.')
    }

    if (typeof document === 'undefined') {
      throw new Error('The page "Document" is undefined, make sure you are running in a browser.')
    }

    const canvasElement = document.createElement('canvas')

    const { width, height } = BrowserScanner.getMediaElementDimensions(mediaElement)

    canvasElement.style.width = width + 'px'
    canvasElement.style.height = height + 'px'
    canvasElement.width = width
    canvasElement.height = height

    return canvasElement
  }

  public static async tryPlayVideo(videoElement: HTMLVideoElement): Promise<boolean> {
    if (videoElement?.ended) {
      // eslint-disable-next-line no-console
      console.error('Trying to play video that has ended.')

      return false
    }

    if (BrowserScanner.isVideoPlaying(videoElement)) {
      // eslint-disable-next-line no-console
      console.warn('Trying to play video that is already playing.')

      return true
    }

    try {
      await videoElement.play()

      return true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('It was not possible to play the video.', error)

      return false
    }
  }

  public static cleanVideoSource(videoElement: HTMLVideoElement): void {
    if (!videoElement) {
      return
    }

    try {
      videoElement.srcObject = null
    } catch (err) {
      videoElement.src = ''
    }

    if (videoElement) {
      videoElement.removeAttribute('src')
    }
  }

  public static releaseAllStreams(): void {
    if (BrowserScanner.streamTracker.length > 0) {
      BrowserScanner.streamTracker.forEach(mediaStream => {
        mediaStream.getTracks().forEach(track => track.stop())
      })
    }

    BrowserScanner.streamTracker = []
  }

  protected static async playVideoOnLoadAsync(
    element: HTMLVideoElement,
    timeout: number
  ): Promise<boolean> {
    const isPlaying = await BrowserScanner.tryPlayVideo(element)

    if (isPlaying) {
      return true
    }

    return new Promise<boolean>((resolve, reject) => {
      // eslint-disable-next-line prefer-const
      let timeoutId: NodeJS.Timeout

      const videoCanPlayListener: EventListener = () => {
        BrowserScanner.tryPlayVideo(element).then(hasPlayed => {
          clearTimeout(timeoutId)
          element.removeEventListener('canplay', videoCanPlayListener)
          resolve(hasPlayed)

          return
        }).catch(() => {
          reject(false)
          element.removeEventListener('canplay', videoCanPlayListener)
        })
      }

      timeoutId = setTimeout(() => {
        if (BrowserScanner.isVideoPlaying(element)) {
          return
        }
        reject(false)
        element.removeEventListener('canplay', videoCanPlayListener)
      }, timeout)

      element.addEventListener('canplay', videoCanPlayListener)
    })
  }

  protected static async attachStreamToVideo(
    stream: MediaStream,
    preview?: string | HTMLVideoElement,
    previewPlayTimeout: number = 3000
  ): Promise<HTMLVideoElement> {
    const videoElement = BrowserScanner.prepareVideoElement(preview)

    BrowserScanner.addVideoSource(videoElement, stream)

    await BrowserScanner.playVideoOnLoadAsync(videoElement, previewPlayTimeout)

    return videoElement
  }

  public decodeBitmap(binaryBitmap: BinaryBitmap): Result {
    return this.reader.decode(binaryBitmap, this.options.hints)
  }

  public decodeFromCanvas(canvas: HTMLCanvasElement): Result {
    const binaryBitmap = BrowserScanner.createBinaryBitmapFromCanvas(canvas)

    return this.decodeBitmap(binaryBitmap)
  }

  public async decodeFromConstraints(
    constraints: MediaStreamConstraints,
    previewElem: string | HTMLVideoElement | undefined,
    callbackFn: DecodeContinuouslyCallback
  ): Promise<ScannerControls> {
    BrowserScanner.checkCallbackFnOrThrow(callbackFn)

    const stream = await this.getUserMedia(constraints)

    try {
      return await this.decodeFromStream(stream, previewElem, callbackFn)
    } catch (error) {
      BrowserScanner.disposeMediaStream(stream)

      throw error
    }
  }

  public async decodeFromStream(
    stream: MediaStream,
    preview: string | HTMLVideoElement | undefined,
    callbackFn: DecodeContinuouslyCallback
  ): Promise<ScannerControls> {
    BrowserScanner.checkCallbackFnOrThrow(callbackFn)

    const video = await BrowserScanner.attachStreamToVideo(
      stream,
      preview,
      this.options.tryPlayVideoTimeout
    )

    const finalizeCallback = (): void => {
      BrowserScanner.disposeMediaStream(stream)
      BrowserScanner.cleanVideoSource(video)
    }

    const originalControls = this.scan(video, callbackFn, finalizeCallback)

    const videoTracks = stream.getVideoTracks()

    const controls: ScannerControls = {
      ...originalControls,

      stop() {
        originalControls.stop()
      },

      async setStreamVideoConstraints(
        constraints: MediaTrackConstraints,
        trackFilter?: (track: MediaStreamTrack) => MediaStreamTrack[]
      ) {
        const tracks = trackFilter ? videoTracks
          .filter(element => trackFilter(element)) : videoTracks

        for (const track of tracks) {
          await track.applyConstraints(constraints)
        }
      },

      getStreamVideoConstraints(trackFilter: (track: MediaStreamTrack) => MediaStreamTrack[]) {
        const track = videoTracks.find(element => trackFilter(element))

        if (!track) {
          throw new Error('No track found.')
        }

        return track.getConstraints()
      },

      getStreamVideoSettings(trackFilter: (track: MediaStreamTrack) => MediaStreamTrack[]) {
        const track = videoTracks.find(element => trackFilter(element))

        if (!track) {
          throw new Error('No track found.')
        }

        return track.getSettings()
      },

      getStreamVideoCapabilities(trackFilter: (track: MediaStreamTrack) => MediaStreamTrack[]) {
        const track = videoTracks.find(element => trackFilter(element))

        if (!track) {
          throw new Error('No track found.')
        }

        return track.getCapabilities()
      }
    }

    const isTorchAvailable = BrowserScanner.mediaStreamIsTorchCompatible(stream)

    if (isTorchAvailable) {
      const torchTrack = videoTracks?.find(track =>
        BrowserScanner.mediaStreamIsTorchCompatibleTrack(track))

      const switchTorch = async (onOff: boolean): Promise<void> => {
        if (!torchTrack) {
          throw new Error('No torch track available.')
        }

        await BrowserScanner.mediaStreamSetTorch(torchTrack, onOff)
      }

      controls.switchTorch = switchTorch

      controls.stop = async () => {
        originalControls.stop()
        await switchTorch(false)
      }
    }

    return controls
  }

  public async decodeFromVideoDevice(
    deviceId: string | undefined,
    previewElem: string | HTMLVideoElement | undefined,
    callbackFn: DecodeContinuouslyCallback
  ): Promise<ScannerControls> {
    BrowserScanner.checkCallbackFnOrThrow(callbackFn)

    const videoConstraints: MediaTrackConstraints = deviceId ? {
      deviceId: { exact: deviceId }
    } : {
      facingMode: 'environment'
    }
    const constraints: MediaStreamConstraints = { video: videoConstraints }

    return this.decodeFromConstraints(constraints, previewElem, callbackFn)
  }

  public scan(
    element: HTMLVisualMediaElement,
    callbackFn: DecodeContinuouslyCallback,
    finalizeCallback?: (error?: Error) => void
  ): ScannerControls {
    BrowserScanner.checkCallbackFnOrThrow(callbackFn)

    const captureCanvas = BrowserScanner.createCaptureCanvas(element)
    let captureCanvasContext = captureCanvas.getContext('2d', { willReadFrequently: true })

    if (!captureCanvasContext) {
      throw new Error('Couldn\'t create canvas for visual element scan.')
    }

    const disposeCanvas = (): void => {
      captureCanvasContext = null
    }

    let stopScan = false
    let lastTimeoutId: null | ReturnType<typeof setTimeout>

    const stop = (): void => {
      stopScan = true

      if (lastTimeoutId) {
        clearTimeout(lastTimeoutId)
      }

      disposeCanvas()

      if (finalizeCallback) {
        finalizeCallback()
      }
    }

    const controls = { stop }

    const loop = (): void => {
      if (stopScan) {
        return
      }

      let result: Result = new Result('', new Uint8Array(0), 0, [], 0, 0)

      try {
        if (!captureCanvasContext) {
          callbackFn(result, new Exception('Canvas is not available'))

          return
        }

        BrowserScanner.drawImageOnCanvas(captureCanvasContext, element)
        result = this.decodeFromCanvas(captureCanvas)

        callbackFn(result, undefined)
        lastTimeoutId = setTimeout(loop, this.options.delayBetweenScanSuccess)
      } catch (error) {
        callbackFn(result, error as Exception)

        const isChecksumError = error instanceof ChecksumException
        const isFormatError = error instanceof FormatException
        const isNotFound = error instanceof NotFoundException

        if (isChecksumError || isFormatError || isNotFound) {
          lastTimeoutId = setTimeout(loop, this.options.delayBetweenScanAttempts)

          return
        }

        disposeCanvas()

        if (finalizeCallback) {
          finalizeCallback(error as Error)
        }
      }
    }

    loop()

    return controls
  }

  public static async listVideoInputDevices(
    requestPermission?: boolean
  ): Promise<MediaDeviceInfo[]> {
    if (!hasNavigator()) {
      throw new Error('Can\'t enumerate devices, navigator is not present.')
    }

    if (!canEnumerateDevices()) {
      throw new Error('Can\'t enumerate devices, method not supported.')
    }

    if (requestPermission) {
      await navigator.mediaDevices.getUserMedia({ video: true })
    }

    const devices = await navigator.mediaDevices.enumerateDevices()

    const videoDevices: MediaDeviceInfo[] = []

    for (const device of devices) {
      const kind = (device.kind as string) === 'video' ? 'videoinput' : device.kind

      if (kind !== 'videoinput') {
        continue
      }

      const deviceId = device.deviceId || (device as unknown as { id: number }).id
      const label = device.label || `Video device ${videoDevices.length + 1}`
      const { groupId } = device

      const videoDevice = { deviceId, label, kind, groupId } as MediaDeviceInfo

      videoDevices.push(videoDevice)
    }

    return videoDevices
  }

  private async getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    BrowserScanner.streamTracker.push(stream)

    return stream
  }

  private static checkCallbackFnOrThrow(callbackFn: DecodeContinuouslyCallback): void {
    if (!callbackFn) {
      throw new ArgumentException('`callbackFn` is a required parameter, you cannot capture results without it.')
    }
  }

  private static disposeMediaStream(stream: MediaStream): void {
    stream.getVideoTracks().forEach(x => x.stop())
  }
}
