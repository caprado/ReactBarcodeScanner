const isPrimitive = (value: unknown): value is string | number | boolean =>
  (typeof value !== 'object' || value === null) && typeof value !== 'function'

export default isPrimitive