import {Event, Store} from 'effector';

export interface ModalModel {
  $title: Store<string | null>,
  $isOpened: Store<boolean>;
  open: Event<string>;
  close: Event<void>;
  opened: Event<void>;
  closed: Event<void>;
  toggle: Event<void>;
}

export interface ModalFactoryOptions {
  modal: ModalModel;
  closeClock?: Event<any> | Array<Event<any>>
}