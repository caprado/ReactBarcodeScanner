import { IllegalArgumentException, InvertedLuminanceSource, LuminanceSource } from '@zxing/library'

/**
 * Extends LuminanceSource to provide functionality for reading luminance data
 * from an HTML canvas element. This class is designed to convert the canvas's image data
 * to a grayscale buffer which can then be used for barcode scanning purposes.
 *
 * @extends LuminanceSource
 */
export class HTMLCanvasElementLuminanceSource extends LuminanceSource {
  /** Conversion factor from degrees to radians. */
  private static DEGREE_TO_RADIANS = Math.PI / 180

  /**
   * Creates a grayscale buffer from the canvas image data.
   * 
   * @param {HTMLCanvasElement} canvas - The canvas element from which to extract image data.
   * @returns {Uint8ClampedArray} The grayscale image buffer.
   */
  private static makeBufferFromCanvasImageData(canvas: HTMLCanvasElement): Uint8ClampedArray {
    const canvasCtx = canvas.getContext('2d', { willReadFrequently: true })

    if (!canvasCtx) {
      throw new Error('Couldn\'t get canvas context.')
    }

    const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height)

    return HTMLCanvasElementLuminanceSource
      .toGrayscaleBuffer(imageData.data, canvas.width, canvas.height)
  }

  /**
   * Converts an image buffer to a grayscale buffer.
   * 
   * @param {Uint8ClampedArray} imageBuffer - The original image buffer.
   * @param {number} width - The width of the image in pixels.
   * @param {number} height - The height of the image in pixels.
   * @returns {Uint8ClampedArray} The grayscale buffer.
   */
  private static toGrayscaleBuffer(
    imageBuffer: Uint8ClampedArray,
    width: number,
    height: number
  ): Uint8ClampedArray {
    const grayscaleBuffer = new Uint8ClampedArray(width * height)

    for (let i = 0, j = 0, { length } = imageBuffer; i < length; i += 4, j++) {
      let gray
      const alpha = imageBuffer[i + 3]

      if (alpha === 0) {
        gray = 0xff
      } else {
        const pixelR = imageBuffer[i]
        const pixelG = imageBuffer[i + 1]
        const pixelB = imageBuffer[i + 2]

        gray = ((306 * pixelR) + (601 * pixelG) + (117 * pixelB) + 0x200) >> 10
      }

      grayscaleBuffer[j] = gray
    }

    return grayscaleBuffer
  }

  /** Buffer that holds the grayscale data of the canvas. */
  private buffer: Uint8ClampedArray
  /** A temporary canvas element used for operations like rotation. */
  private tempCanvasElement?: HTMLCanvasElement = undefined

  /**
   * Initializes a new instance of HTMLCanvasElementLuminanceSource.
   * 
   * @param {HTMLCanvasElement} canvas - The canvas element to use as the luminance source.
   */
  public constructor(private canvas: HTMLCanvasElement) {
    super(canvas.width, canvas.height)
    this.buffer = HTMLCanvasElementLuminanceSource.makeBufferFromCanvasImageData(canvas)
  }

  /**
   * Retrieves a row of grayscale values from the internal buffer.
   * 
   * @param {number} y - The row index to retrieve.
   * @param {Uint8ClampedArray} row - An existing array to store the row's data, or null to create a new one.
   * @returns {Uint8ClampedArray} The row of grayscale values.
   * @throws {IllegalArgumentException} If the specified row index is outside the bounds of the image.
   */
  public getRow(y: number, row: Uint8ClampedArray): Uint8ClampedArray {
    if (y < 0 || y >= this.getHeight()) {
      throw new IllegalArgumentException('Requested row is outside the image: ' + y)
    }

    const width: number = this.getWidth()
    const start = y * width

    if (row === null) {
      row = this.buffer.slice(start, start + width)
    } else {
      if (row.length < width) {
        row = new Uint8ClampedArray(width)
      }

      row.set(this.buffer.slice(start, start + width))
    }

    return row
  }

  /**
   * Retrieves the entire buffer containing grayscale values.
   * 
   * @returns {Uint8ClampedArray} The grayscale image buffer.
   */
  public getMatrix(): Uint8ClampedArray {
    return this.buffer
  }

  /**
   * Indicates whether the crop operation is supported by this luminance source.
   * 
   * @returns {boolean} True, as cropping is supported.
   */
  public isCropSupported(): boolean {
    return true
  }

  /**
   * Crops the luminance source to a specified rectangle, altering the internal state
   * to reflect the cropped region. Note: This implementation only simulates cropping
   * by adjusting internal pointers and does not actually remove data from the buffer.
   * 
   * @param {number} left - The x-coordinate of the top-left corner of the crop area.
   * @param {number} top - The y-coordinate of the top-left corner of the crop area.
   * @param {number} width - The width of the crop area.
   * @param {number} height - The height of the crop area.
   * @returns {LuminanceSource} The cropped luminance source.
   * @throws {UnsupportedOperationException} If the crop operation fails.
   */
  public crop(left: number, top: number, width: number, height: number): LuminanceSource {
    super.crop(left, top, width, height)

    return this
  }

  /**
   * Checks if rotation operations are supported.
   * @returns {boolean} True, indicating that rotation is supported by this luminance source.
   */
  public isRotateSupported(): boolean {
    return true
  }

  /**
   * Rotates the luminance source 90 degrees counter-clockwise.
   * @returns {LuminanceSource} This luminance source, after the rotation.
   */
  public rotateCounterClockwise(): LuminanceSource {
    this.rotate(-90)

    return this
  }

  /**
   * Rotates the luminance source 45 degrees counter-clockwise.
   * @returns {LuminanceSource} This luminance source, after the rotation.
   */
  public rotateCounterClockwise45(): LuminanceSource {
    this.rotate(-45)

    return this
  }

  /**
   * Inverts the luminance values of the source, effectively creating a negative image.
   * @returns {LuminanceSource} A new luminance source that is an inverted version of this one.
   */
  public invert(): LuminanceSource {
    return new InvertedLuminanceSource(this)
  }

  /**
   * Retrieves or creates a temporary canvas element for operations like rotation.
   * @returns {HTMLCanvasElement | undefined} The temporary canvas element, or undefined if it cannot be created.
   */
  private getTempCanvasElement(): HTMLCanvasElement | undefined {
    if (null === this.tempCanvasElement) {
      const tempCanvasElement = this.canvas.ownerDocument.createElement('canvas')
      tempCanvasElement.width = this.canvas.width
      tempCanvasElement.height = this.canvas.height
      this.tempCanvasElement = tempCanvasElement
    }

    return this.tempCanvasElement
  }

  /**
   * Applies a rotation transformation to the luminance source.
   * @param {number} angle - The angle to rotate by, in degrees.
   * @returns {this} The instance of this class, after the rotation.
   * @throws {Error} If a canvas or canvas context cannot be created.
   */
  private rotate(angle: number): this {
    const tempCanvasElement = this.getTempCanvasElement()

    if (!tempCanvasElement) {
      throw new Error('Could not create a Canvas element.')
    }

    const angleRadians = angle * HTMLCanvasElementLuminanceSource.DEGREE_TO_RADIANS

    const { width } = this.canvas
    const { height } = this.canvas
    const newWidth = Math.ceil(
      Math.abs((Math.cos(angleRadians)) * width) + (Math.abs(Math.sin(angleRadians)) * height))
    const newHeight = Math.ceil((
      Math.abs(Math.sin(angleRadians)) * width) + (Math.abs(Math.cos(angleRadians)) * height))
    tempCanvasElement.width = newWidth
    tempCanvasElement.height = newHeight

    const tempContext = tempCanvasElement.getContext('2d', { willReadFrequently: true })

    if (!tempContext) {
      throw new Error('Could not create a Canvas Context element.')
    }

    tempContext.translate(newWidth / 2, newHeight / 2)
    tempContext.rotate(angleRadians)
    tempContext.drawImage(this.canvas, width / -2, height / -2)

    this.buffer = HTMLCanvasElementLuminanceSource.makeBufferFromCanvasImageData(tempCanvasElement)

    return this
  }
}
