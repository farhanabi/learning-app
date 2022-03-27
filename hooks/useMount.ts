import { useEffect } from 'react';

/**
 * Run a function when a component is mounted.
 *
 * @param callback function to be executed
 */
export function useMount(callback: () => void) {
  useEffect(callback, []);
}
