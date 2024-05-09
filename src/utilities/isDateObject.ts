/**
 * Type guard to check if a value is a Date object.
 * 
 * @param {unknown} value - The value to check.
 * @returns {value is Date} True if the value is a Date object, false otherwise.
 */
const isDateObject = (value: unknown): value is Date => value instanceof Date

export default isDateObject