import {Event, sample} from 'effector';
import {modelFactory} from 'effector-factorio';

import {ModalFactoryOptions} from '~/shared/lib/types';

export const factory = modelFactory(({modal, closeClock}: ModalFactoryOptions) => {
  const modalOpened = modal.opened;
  const modalClosed = modal.closed;

  if (closeClock) {
    sample({
      clock: closeClock as Array<Event<any>>,
      target: modal.close,
    });
  }

  return {
    modal,
    modalOpened,
    modalClosed,
  };
});
