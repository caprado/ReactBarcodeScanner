export const hasNavigator = (): boolean => typeof navigator !== 'undefined'

const isMediaDevicesSupported = (): boolean => hasNavigator() && Boolean(navigator.mediaDevices)

export const canEnumerateDevices = (): boolean =>
  Boolean(isMediaDevicesSupported() && navigator.mediaDevices.enumerateDevices)
