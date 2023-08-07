import {createEffect} from "effector";
import {requestApiFx} from "~/shared/api/request";

interface SignIn {
    login: string;
    password: string;
}

export type SignInError = {
    message: 'key_login_or_password_incorrect' | 'invalid_request'
};

export const signInFx = createEffect<SignIn, void, SignInError>((form) => {
    //await new Promise((resolve) => setTimeout(resolve, 600));
    return requestApiFx({
        path: '/auth/login',
        method: 'POST',
        body: form,
    });
});