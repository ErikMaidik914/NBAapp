import { User } from '../../../models/user';
import { UserFormType } from '../../../types/UserFormProps.types';
import { FormEntry } from '../Form Entry/FormEntry';

import './FormUser.css';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeHolder: string;
    defaultValue: string;
};

function setFormEntriesForUser(formEntries: FormEntryType[], givenUser: User | undefined) {
    if (givenUser !== undefined) {
        // formEntries[0].disabled = true;

        // formEntries[0].defaultValue = givenUser.getId().toString();
        formEntries[0].defaultValue = givenUser.getName();
        formEntries[1].defaultValue = givenUser.getTeam();
        formEntries[2].defaultValue = givenUser.getPictureUrl();
        formEntries[3].defaultValue = givenUser.getAge().toString();
        // formEntries[3].defaultValue = givenUser.getPictureUrl();
    }

    return formEntries;
}

function createFormEntries(props: UserFormType) {
    let formEntries = [
        // { label: 'ID', ref: props.idInput, placeHolder: 'ID', defaultValue: '', disabled: false },
        { label: 'Name', ref: props.nameInput, placeHolder: 'Name', defaultValue: '' },
        { label: 'Team', ref: props.teamInput, placeHolder: 'Team', defaultValue: '' },
        { label: 'URL', ref: props.urlInput, placeHolder: 'URL', defaultValue: '' },
        { label: 'Age', ref: props.ageInput, placeHolder: 'Age', defaultValue: '' },
    ];

    formEntries = setFormEntriesForUser(formEntries, props.givenUser);

    return formEntries;
}

export function UserForm(props: UserFormType) {
    const formEntries = createFormEntries(props);

    return (
        <div className='form-div' data-testid='user-form'>
            <form className='user-form'>
                {formEntries.map((entry) => (
                    <FormEntry
                        key={entry.label}
                        ref={entry.ref}
                        label={entry.placeHolder}
                        placeHolder={entry.placeHolder}
                        defaultValue={entry.defaultValue}
                    />
                ))}
            </form>
        </div>
    );
}
