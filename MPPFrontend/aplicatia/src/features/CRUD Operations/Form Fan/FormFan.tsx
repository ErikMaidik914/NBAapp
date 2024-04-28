import { Fan } from '../../../models/fan';
import { FanFormType } from '../../../types/FanFormProps.types';
import { FormEntry } from '../Form Entry/FormEntry';

import './FormFan.css';

type FormEntryType = {
    label: string;
    ref: React.RefObject<HTMLInputElement>;
    placeHolder: string;
    defaultValue: string;
};

function setFormEntriesForFan(formEntries: FormEntryType[], givenFan: Fan | undefined) {
    if (givenFan !== undefined) {
        // formEntries[0].disabled = true;

        // formEntries[0].defaultValue = givenFan.getId().toString();
        formEntries[0].defaultValue = givenFan.getName();
        formEntries[2].defaultValue = givenFan.getPictureUrl();
        // formEntries[3].defaultValue = givenFan.getPictureUrl();
    }

    return formEntries;
}

function createFormEntries(props: FanFormType) {
    let formEntries = [
        { label: 'userId', ref: props.userIdInput, placeHolder: 'userId', defaultValue: '' },
        // { label: 'ID', ref: props.idInput, placeHolder: 'ID', defaultValue: '', disabled: false },
        { label: 'Name', ref: props.nameInput, placeHolder: 'Name', defaultValue: '' },

        { label: 'URL', ref: props.urlInput, placeHolder: 'URL', defaultValue: '' },
    ];

    formEntries = setFormEntriesForFan(formEntries, props.givenFan);

    return formEntries;
}

export function FanForm(props: FanFormType) {
    const formEntries = createFormEntries(props);

    return (
        <div className='form-div' data-testid='fan-form'>
            <form className='fan-form'>
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
