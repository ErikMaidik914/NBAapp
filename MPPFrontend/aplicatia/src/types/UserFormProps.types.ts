import { User } from '../models/user';

export type UserFormType = {
    nameInput: React.RefObject<HTMLInputElement>;
    teamInput: React.RefObject<HTMLInputElement>;
    urlInput: React.RefObject<HTMLInputElement>;
    ageInput: React.RefObject<HTMLInputElement>;
    givenUser?: User;
};
