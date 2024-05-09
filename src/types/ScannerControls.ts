/**
 * Type definition for control functions provided by a scanner.
 * These controls allow for stopping the scan, toggling torch mode,
 * and managing stream video constraints, settings, and capabilities.
 */
type ScannerControls = {
  /** Stops the scanning process. */
  stop: () => void
  /**
   * Optionally toggles the torch (flashlight) of the device's camera.
   * @param {boolean} onOff - True to turn the torch on, false to turn it off.
   * @returns {Promise<void>} A promise that resolves when the torch state has been changed.
   */
  switchTorch?: (onOff: boolean) => Promise<void>
  /**
   * Optionally sets video constraints for the scanning stream.
   * @param {MediaTrackConstraints} constraints - The new constraints to apply to the video stream.
   * @param {(track: MediaStreamTrack) => MediaStreamTrack[]} [trackFilter] - A function to filter specific tracks for applying constraints.
   */
  setStreamVideoConstraints?: (
    constraints: MediaTrackConstraints,
    trackFilter?: (track: MediaStreamTrack) => MediaStreamTrack[]
  ) => void
  /**
   * Optionally retrieves the current video constraints of the scanning stream.
   * @param {(track: MediaStreamTrack) => MediaStreamTrack[]} trackFilter - A function to filter specific tracks for retrieving constraints.
   * @returns {MediaTrackConstraints} The current video constraints applied to the stream.
   */
  getStreamVideoConstraints?: (
    trackFilter: (track: MediaStreamTrack) => MediaStreamTrack[]
  ) => MediaTrackConstraints
  /**
   * Optionally retrieves the current video settings of the scanning stream.
   * @param {(track: MediaStreamTrack) => MediaStreamTrack[]} trackFilter - A function to filter specific tracks for retrieving settings.
   * @returns {MediaTrackSettings} The current settings of the video stream.
   */
  getStreamVideoSettings?: (
    trackFilter: (track: MediaStreamTrack) => MediaStreamTrack[]
  ) => MediaTrackSettings
  /**
   * Optionally retrieves the video capabilities of the scanning stream.
   * @param {(track: MediaStreamTrack) => MediaStreamTrack[]} trackFilter - A function to filter specific tracks for retrieving capabilities.
   * @returns {MediaTrackCapabilities} The capabilities of the video stream.
   */
  getStreamVideoCapabilities?: (
    trackFilter: (track: MediaStreamTrack) => MediaStreamTrack[]
  ) => MediaTrackCapabilities
}


export default ScannerControls
