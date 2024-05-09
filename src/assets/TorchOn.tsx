import { CSSProperties, ReactElement } from 'react'

/**
 * Props for the TorchOn component.
 */
type TorchOnProps = {
  /** The CSS class name for styling. */
  className?: string // The CSS class name for styling.
  /** Inline styles for the component. */
  style?: CSSProperties // Inline styles for the component.
  /** The function to be called on click event. */
  onClick: () => void // The function to be called on click event.
}

/**
 * TorchOn component.
 * @param {TorchOnProps} props - The props for the TorchOn component.
 * @returns {ReactElement} A React SVG element representing a torch on icon.
 */
const TorchOn = ({ className, style, onClick }: TorchOnProps): ReactElement => (
  <svg
    onClick={onClick}
    width='30px'
    height='30px'
    viewBox='0 0 24 24'
    className={className}
    style={style}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      strokeWidth={0.2}
      stroke='yellow'
      fill='yellow'
      d='M13.225 9l5.025-7h-7.972l-3.3 11h5.359l-2.452 8.648.75.364L20.374 9zm.438 3H8.322l2.7-9H16.3l-5.025 7h7.101l-6.7 8.953z'
    />
  </svg>
)

export default TorchOn