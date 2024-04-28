import { Fan } from '../models/fan';

export type FanFormType = {
    userIdInput: React.RefObject<HTMLInputElement>;
    nameInput: React.RefObject<HTMLInputElement>;
    urlInput: React.RefObject<HTMLInputElement>;
    givenFan?: Fan;
};
