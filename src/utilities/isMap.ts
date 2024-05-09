/**
 * Type guard to check if a value is a Map.
 * 
 * @param {unknown} value - The value to check.
 * @returns {value is Map<unknown, unknown>} True if the value is a Map, false otherwise.
 */
const isMap = (value: unknown): value is Map<unknown, unknown> => value instanceof Map

export default isMap