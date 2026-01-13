/**
 * Array Safety Utilities
 * Provides bulletproof array operations for templates
 */

/**
 * Safely map over an array, returning empty array if input is null/undefined
 * @param array - Array to map over (can be null/undefined)
 * @param callback - Mapping function
 * @returns Mapped array or empty array
 */
export function safeMap<T, R>(
    array: T[] | undefined | null,
    callback: (item: T, index: number, arr: T[]) => R
): R[] {
    return (array || []).map(callback);
}

/**
 * Safely filter an array, returning empty array if input is null/undefined
 * @param array - Array to filter (can be null/undefined)
 * @param predicate - Filter function
 * @returns Filtered array or empty array
 */
export function safeFilter<T>(
    array: T[] | undefined | null,
    predicate: (item: T, index: number, arr: T[]) => boolean
): T[] {
    return (array || []).filter(predicate);
}

/**
 * Safely get array length, returning 0 if input is null/undefined
 * @param array - Array to check (can be null/undefined)
 * @returns Array length or 0
 */
export function safeLength<T>(array: T[] | undefined | null): number {
    return array?.length || 0;
}

/**
 * Safely check if array has items
 * @param array - Array to check (can be null/undefined)
 * @returns true if array has items, false otherwise
 */
export function hasItems<T>(array: T[] | undefined | null): boolean {
    return (array?.length || 0) > 0;
}

/**
 * Safely get first item from array
 * @param array - Array to get first item from (can be null/undefined)
 * @returns First item or undefined
 */
export function safeFirst<T>(array: T[] | undefined | null): T | undefined {
    return array?.[0];
}

/**
 * Safely get last item from array
 * @param array - Array to get last item from (can be null/undefined)
 * @returns Last item or undefined
 */
export function safeLast<T>(array: T[] | undefined | null): T | undefined {
    return array?.[array.length - 1];
}

/**
 * Safely slice an array
 * @param array - Array to slice (can be null/undefined)
 * @param start - Start index
 * @param end - End index (optional)
 * @returns Sliced array or empty array
 */
export function safeSlice<T>(
    array: T[] | undefined | null,
    start: number,
    end?: number
): T[] {
    return (array || []).slice(start, end);
}

/**
 * Safely find item in array
 * @param array - Array to search (can be null/undefined)
 * @param predicate - Search function
 * @returns Found item or undefined
 */
export function safeFind<T>(
    array: T[] | undefined | null,
    predicate: (item: T, index: number, arr: T[]) => boolean
): T | undefined {
    return (array || []).find(predicate);
}

/**
 * Safely reduce an array
 * @param array - Array to reduce (can be null/undefined)
 * @param callback - Reducer function
 * @param initialValue - Initial value
 * @returns Reduced value
 */
export function safeReduce<T, R>(
    array: T[] | undefined | null,
    callback: (acc: R, item: T, index: number, arr: T[]) => R,
    initialValue: R
): R {
    return (array || []).reduce(callback, initialValue);
}

/**
 * Ensure value is an array
 * @param value - Value to check
 * @returns Array (original if already array, wrapped if single item, empty if null/undefined)
 */
export function ensureArray<T>(value: T | T[] | undefined | null): T[] {
    if (value === null || value === undefined) return [];
    return Array.isArray(value) ? value : [value];
}
