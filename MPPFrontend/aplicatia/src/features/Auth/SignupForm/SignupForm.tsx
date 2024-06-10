import { Account } from '../../../models/account';
import { SignupFormType } from '../../../types/SignupFormProps.types';
import { SignupFormEntry } from '../SignupFormEntry/SignupFormEntry';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeHolder: string;
    defaultValue: string;
};

function setSignupFormEntries(formEntries: FormEntryType[], givenUser: Account | undefined) {
    if (givenUser !== undefined) {
        formEntries[0].defaultValue = givenUser.getUsername();
        formEntries[1].defaultValue = givenUser.getEmail();
        formEntries[2].defaultValue = givenUser.getPassword();
    }

    return formEntries;
}

function createFormEntries(props: any) {
    let formEntries = [
        {
            label: 'Username',
            ref: props.usernameInput,
            placeHolder: 'Enter username',
            defaultValue: '',
        },
        {
            label: 'Email',
            ref: props.emailInput,
            placeHolder: 'Enter email',
            defaultValue: '',
        },
        {
            label: 'Password',
            ref: props.passwordInput,
            placeHolder: 'Enter password',
            defaultValue: '',
        },
    ];

    formEntries = setSignupFormEntries(formEntries, props.givenUser);

    return formEntries;
}

export function SignupForm(props: SignupFormType) {
    const formEntries = createFormEntries(props);

    return (
        <div className='signup-form-div' data-testid='signup-form-test-id'>
            <form className='signup-form'>
                {formEntries.map((formEntry) => (
                    <SignupFormEntry
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
