/**
 * Checks if the `navigator` object is available in the current execution context.
 * This is typically used to determine if the code is running in an environment where
 * browser-specific objects are accessible.
 *
 * @returns {boolean} True if `navigator` is defined, false otherwise.
 */
export const hasNavigator = (): boolean => typeof navigator !== 'undefined'

/**
 * Determines if the mediaDevices API is supported in the current execution context.
 * This API is necessary for accessing connected media input devices like cameras and microphones.
 *
 * @returns {boolean} True if `navigator.mediaDevices` is supported, false otherwise.
 */
const isMediaDevicesSupported = (): boolean => hasNavigator() && Boolean(navigator.mediaDevices)

/**
 * Checks if the `enumerateDevices` function is available on `navigator.mediaDevices`.
 * This function is used to list the media input and output devices connected to the system.
 *
 * @returns {boolean} True if `enumerateDevices` is available to be called, false otherwise.
 */
export const canEnumerateDevices = (): boolean =>
  Boolean(isMediaDevicesSupported() && navigator.mediaDevices.enumerateDevices)
