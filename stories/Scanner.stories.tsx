import { action } from '@storybook/addon-actions'
import { ReactElement, useState } from 'react'
import { Scanner as ScannerComp, ScannerProps } from '../src'
import Devices from '../src/components/Devices'
import { defaultConstraints } from '../src/misc'

const styles = {
  container: {
    width: 400,
    margin: 'auto'
  },
  devices: {
    marginBottom: 10
  }
}

const Template = (args: ScannerProps): ReactElement => {
  const [deviceId, setDeviceId] = useState('')

  function handleOnChange(deviceId: string): void {
    // eslint-disable-next-line no-console
    console.log({ deviceId })
    setDeviceId(deviceId)
  }

  return (
    <div style={styles.container}>
      <div style={styles.devices}>
        <Devices onChange={handleOnChange} />
      </div>
      <ScannerComp
        {...args}
        enabled={true}
        onResult={text => {
          action('onResult')(text)
        }}
        onError={error => {
          action('onError')(error?.message)
        }}
        components={{
          count: true,
          audio: true,
          tracker: true,
          torch: true,
          onOff: true
        }}
        options={{
          deviceId,
          delayBetweenScanAttempts: 100,
          delayBetweenScanSuccess: 100
        }}
      />
    </div>
  )
}

export const Scanner = Template.bind({})

// @ts-expect-error - Story args
Scanner.args = {
  tracker: true,
  count: false,
  constraints: defaultConstraints,
  deviceId: ''
}

export default {
  title: 'Scanner'
}
