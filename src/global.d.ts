export {};

declare global {
    interface Window {
        // @ts-ignore
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}