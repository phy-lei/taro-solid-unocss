import type { Store, StoreValue } from 'nanostores';
import { createStore, reconcile } from 'solid-js/store';
import type { ReconcileOptions } from 'solid-js/store'
import type { Accessor } from 'solid-js';
import { onCleanup } from 'solid-js';

/**
 * Subscribes to store changes and gets store’s value.
 *
 * @param store Store instance.
 * @returns Store value.
 */
export default function useStore<
  SomeStore extends Store,
  Value extends StoreValue<SomeStore>,
>(store: SomeStore, options?: ReconcileOptions): Accessor<Value> {
  const [state, setState] = createStore({
    value: store.get()
  });

  const unsubscribe = store.subscribe((newValue) => {
    setState('value', reconcile(newValue, options ?? {}))
  });

  onCleanup(() => unsubscribe());

  return () => state.value;
}
