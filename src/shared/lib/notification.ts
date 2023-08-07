import {createEffect, createEvent, sample} from "effector";
import {notifications} from "@mantine/notifications";

export interface NotificationType {
    type: 'error' | 'success',
    title?: string,
    message: string
}

export const showNotification = createEvent<NotificationType>();

const showNotificationFx = createEffect(({type, title, message}: NotificationType) => {
    notifications.show({
        color: type === 'error' ? 'red' : 'blue',
        title: title ?? type === 'error' ? 'Error' : 'Success',
        message: message,
        loading: false,
        autoClose: 5000,
        withCloseButton: true,
    });
});

export const showErrorNotification = showNotificationFx.prepend((message: string) => {
    return {
        type: "error",
        message,
    };
});
export const showSuccessNotification = showNotificationFx.prepend((message: string) => {
    return {
        type: "success",
        message,
    };
});

sample({
    clock: showNotification,
    target: showNotificationFx,
});
