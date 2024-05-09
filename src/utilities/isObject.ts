import { Comparable } from './deepEqual'

/**
 * Type guard to check if a value is a plain object (excluding arrays, null, and dates).
 * 
 * @param {unknown} value - The value to check.
 * @returns {value is { [key: string]: Comparable }} True if the value is a plain object, false otherwise.
 */
const isObject = (value: unknown): value is { [key: string]: Comparable } =>
  typeof value === 'object' && value !== null && !(value instanceof Array) && !(value instanceof Date)

export default isObject