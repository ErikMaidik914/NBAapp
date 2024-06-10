import { Account } from '../models/account';

export type LoginFormType = {
    // idInput: React.RefObject<HTMLInputElement>;
    usernameInput: React.RefObject<HTMLInputElement>;
    passwordInput: React.RefObject<HTMLInputElement>;
    givenUser?: Account;
};
