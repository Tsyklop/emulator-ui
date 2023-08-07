import {createEvent, createStore, Event, sample, Store} from 'effector';
import {ModalModel} from "~/shared/lib/types";

export function createModal(name?: string, initialTitle?: string): ModalModel {

  const open = createEvent<string>(name && `${name} modal open`);
  const close = createEvent(name && `${name} modal close`);
  const toggle = createEvent(name && `${name} modal toggle`);

  const opened = createEvent(name && `${name} modal opened`);
  const closed = createEvent(name && `${name} modal closed`);

  const $title = createStore<string | null>(initialTitle ?? null);

  $title.on(open, (_, title) => title);

  const $isOpened = createStore<boolean>(false, {name: name && `${name} modal state`});

  $isOpened.on(open, () => true);
  $isOpened.on(close, () => false);
  $isOpened.on(toggle, (value) => !value);

  sample({
    clock: $isOpened,
    filter: (value) => value,
    target: opened,
  });

  sample({
    clock: $isOpened,
    filter: (value) => !value,
    target: closed,
  });

  return {
    $title,
    $isOpened,
    open,
    close,
    opened,
    closed,
    toggle,
  };
}