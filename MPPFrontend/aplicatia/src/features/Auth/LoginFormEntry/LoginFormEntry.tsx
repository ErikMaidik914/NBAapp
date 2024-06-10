import { forwardRef } from 'react';
import { FormEntryProps } from '../../../types/FormEntryProps.types';
import './LoginFormEntry.css';

export const LoginFormEntry = forwardRef<HTMLInputElement, FormEntryProps>((props, ref) => {
    return (
        <div className='login-form-entry' data-testid='login-form-entry-test-id'>
            <label className='login-form-label' htmlFor={props.label}>
                {props.label}
            </label>
            {props.label === 'Password' ? (
                <input
                    className='login-form-input'
                    type='password'
                    id={props.label}
                    ref={ref}
                    data-testid='login-form-input-test-id'
                    placeholder={props.placeHolder}
                    //disabled={props.disabled}
                />
            ) : (
                <input
                    className='login-form-input'
                    type='text'
                    id={props.label}
                    ref={ref}
                    data-testid='login-form-input-test-id'
                    placeholder={props.placeHolder}
                    //disabled={props.disabled}
                    defaultValue={props.defaultValue}
                />
            )}
        </div>
    );
});
