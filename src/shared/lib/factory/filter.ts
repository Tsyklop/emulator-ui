import {createEvent, createStore, Store, Event} from "effector";

export interface Filter<V> {
    reset: Event<void>,
    $value: Store<V>,
    changed: Event<V>
}

export interface FilterProps<V> {
    defaultValue: V
}

export const createFilter = <V>(props: FilterProps<V>) => {

    const reset = createEvent();

    const changed = createEvent<V>();

    const $value = createStore<V>(props.defaultValue);

    $value.on(changed, (_, value) => value);
    $value.reset(reset);

    return {
        reset,
        $value,
        changed
    } as Filter<V>;

};