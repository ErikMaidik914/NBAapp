import { Account } from '../../../models/account';
import { LoginFormType } from '../../../types/LoginFormProps.types';
import { LoginFormEntry } from '../LoginFormEntry/LoginFormEntry';

import './LoginForm.css';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeHolder: string;
    defaultValue: string;
};

function setLoginFormEntries(formEntries: FormEntryType[], givenUser: Account | undefined) {
    if (givenUser !== undefined) {
        formEntries[0].defaultValue = givenUser.getUsername();
        formEntries[1].defaultValue = givenUser.getPassword();
    }

    return formEntries;
}

function createFormEntries(props: LoginFormType) {
    let formEntries = [
        {
            label: 'Username',
            ref: props.usernameInput,
            placeHolder: 'Enter username',
            defaultValue: '',
        },
        {
            label: 'Password',
            ref: props.passwordInput,
            placeHolder: 'Enter password',
            defaultValue: '',
        },
    ];

    formEntries = setLoginFormEntries(formEntries, props.givenUser);

    return formEntries;
}

export function LoginForm(props: LoginFormType) {
    const formEntries = createFormEntries(props);

    return (
        <div className='login-form-div' data-testid='login-form-test-id'>
            <form className='login-form'>
                {formEntries.map((formEntry) => (
                    <LoginFormEntry
                        key={formEntry.label}
                        label={formEntry.label}
                        defaultValue={formEntry.defaultValue}
                        placeHolder={formEntry.placeHolder}
                        //disabled={formEntry.disabled}
                        ref={formEntry.ref}
                    />
                ))}
            </form>
        </div>
    );
}
