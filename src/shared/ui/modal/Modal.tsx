import {Modal as MantineModal} from '@mantine/core';
import {modelView} from 'effector-factorio';
import {useUnit} from 'effector-react';
import React, {memo, PropsWithChildren, useCallback} from 'react';

import {factory} from './factory';

export interface ModalViewProps extends PropsWithChildren {

}

const Component = modelView(
  factory,
  memo<ModalViewProps>((props) => {
    const {children} = props;

    const model = factory.useModel();
    const [title, isOpened] = useUnit([model.modal.$title, model.modal.$isOpened]);

    const onClose = useCallback(() => {
        model.modal.close();
    }, [model.modal]);

    return (
      <MantineModal.Root centered opened={isOpened} onClose={onClose}>
          <MantineModal.Overlay/>
          <MantineModal.Content>
              <MantineModal.Header>
                  <MantineModal.Title>{title}</MantineModal.Title>
                  <MantineModal.CloseButton/>
              </MantineModal.Header>
              <MantineModal.Body>
                  {children}
              </MantineModal.Body>
          </MantineModal.Content>
      </MantineModal.Root>
    );
  }),
);

Component.displayName = 'Modal';

export const Modal = {
  factory,
  Component,
};