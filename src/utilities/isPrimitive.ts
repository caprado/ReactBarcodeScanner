/**
 * Type guard to check if a value is a primitive (string, number, or boolean).
 * 
 * @param {unknown} value - The value to check.
 * @returns {value is string | number | boolean} True if the value is a primitive, false otherwise.
 */
const isPrimitive = (value: unknown): value is string | number | boolean =>
  (typeof value !== 'object' || value === null) && typeof value !== 'function'

export default isPrimitive