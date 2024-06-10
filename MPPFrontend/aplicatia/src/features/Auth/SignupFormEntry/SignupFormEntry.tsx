import { forwardRef } from 'react';

import { FormEntryProps } from '../../../types/FormEntryProps.types';
import './SignupFormEntry.css';

export const SignupFormEntry = forwardRef<HTMLInputElement, FormEntryProps>((props, ref) => {
    return (
        <div className='signup-form-entry' data-testid='signup-form-entry-test-id'>
            <label className='signup-form-label' htmlFor={props.label}>
                {props.label}
            </label>
            {props.label === 'Password' ? (
                <input
                    className='signup-form-input'
                    type='password'
                    id={props.label}
                    ref={ref}
                    data-testid='signup-form-input-test-id'
                    placeholder={props.placeHolder}
                    //disabled={props.disabled}
                />
            ) : (
                <input
                    className='signup-form-input'
                    type='text'
                    id={props.label}
                    ref={ref}
                    data-testid='signup-form-input-test-id'
                    placeholder={props.placeHolder}
                    //disabled={props.disabled}
                    defaultValue={props.defaultValue}
                />
            )}
        </div>
    );
});
