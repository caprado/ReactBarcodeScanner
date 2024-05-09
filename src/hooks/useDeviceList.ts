import { useEffect, useState } from 'react'
import { BrowserScanner } from '../scanners/BrowserScanner'

/**
 * React hook for fetching a list of available video input devices.
 * This hook asynchronously fetches the devices when the component mounts and updates
 * the state with the list of devices.
 *
 * @returns {MediaDeviceInfo[]} An array of MediaDeviceInfo objects representing the video input devices.
 */
export const useDeviceList = (): MediaDeviceInfo[] => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const getDevices = async (): Promise<MediaDeviceInfo[]> => {
    const devices = (await BrowserScanner.listVideoInputDevices(true)) || []
    const hasDevices = devices && devices.length > 0

    if (!hasDevices) {
      // eslint-disable-next-line no-console
      console.warn('No video input devices found')
    }

    return devices
  }

  useEffect(() => {
    (async () => {
      setDevices(await getDevices())
    })()
  }, [])

  return devices
}
