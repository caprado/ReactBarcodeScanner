import { Comparable } from './deepEqual'

const isObject = (value: unknown): value is { [key: string]: Comparable } =>
  typeof value === 'object' && value !== null && !(value instanceof Array) && !(value instanceof Date)

export default isObject