import { Account } from '../models/account';

export type SignupFormType = {
    // idInput: React.RefObject<HTMLInputElement>;
    usernameInput: React.RefObject<HTMLInputElement>;
    emailInput: React.RefObject<HTMLInputElement>;
    passwordInput: React.RefObject<HTMLInputElement>;
    givenUser?: Account;
};
