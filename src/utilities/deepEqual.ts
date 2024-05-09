import isObject from '../utilities/isObject'
import isDateObject from './isDateObject'
import isMap from './isMap'
import isPrimitive from './isPrimitive'

/**
 * Recursively makes properties in T optional. Useful for specifying types where
 * nested property updates may occur, allowing for partial type specifications.
 *
 * @template T - The type to be partially applied recursively.
 */
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * Defines types that can be compared using the deepEqual function.
 * This includes primitives, composite types, and structured data types.
 */
export type Comparable =
  string |
  number |
  boolean |
  Date |
  Comparable[] |
  { [key: string]: Comparable } |
  Map<Comparable, Comparable> |
  DeepPartial<MediaTrackConstraints>

/**
 * Performs a deep equality check on two values of comparable types.
 * This function considers object structure, type consistency, and actual value equality.
 *
 * @template T - A type that extends the Comparable union.
 * @param {T} object1 - The first object to compare.
 * @param {T} object2 - The second object to compare.
 * @returns {boolean} True if the objects are considered equal, false otherwise.
 */
const deepEqual = <T extends Comparable>(object1: T, object2: T): boolean => {
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return object1 === object2
  }

  if (isDateObject(object1) && isDateObject(object2)) {
    return object1.getTime() === object2.getTime()
  }

  if (isMap(object1) && isMap(object2)) {
    if (object1.size !== object2.size) {
      return false
    }
    for (const [key, val] of object1.entries()) {
      if (!object2.has(key) || !deepEqual(val, object2.get(key) as Comparable)) {
        return false
      }
    }

    return true
  }

  if (isObject(object1) && isObject(object2)) {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      const val1 = object1[key]
      const val2 = object2[key]

      if (!keys2.includes(key) || !deepEqual(val1 as Comparable, val2 as Comparable)) {
        return false
      }
    }

    return true
  }

  return false
}

export default deepEqual
