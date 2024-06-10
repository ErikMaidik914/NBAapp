import axios from 'axios';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../shared/components/layout/Layout';

import { AccountContext } from '../../contexts/AccountContext';
import { SignupForm } from '../../features/Auth/SignupForm/SignupForm';
import { Account } from '../../models/account';
import { Button } from '../../shared/components/button/Button';
import './SignupPage.css';

function handleOnClick(
    usernameInput: React.RefObject<HTMLInputElement>,
    emailInput: React.RefObject<HTMLInputElement>,
    passwordInput: React.RefObject<HTMLInputElement>,
): { username: string; email: string; password: string } {
    if (!usernameInput.current || !emailInput.current || !passwordInput.current) {
        throw new Error('Null references');
    }

    if (!usernameInput.current!.value || !emailInput.current!.value || !passwordInput.current!.value) {
        throw new Error('All fields are required');
    }

    const userUsername: string = usernameInput.current!.value;
    const userEmail: string = emailInput.current!.value;
    const userPassword: string = passwordInput.current!.value;

    const inputFields = {
        username: userUsername,
        email: userEmail,
        password: userPassword,
    };

    return inputFields;
}

const SignupPage = () => {
    document.title = 'Astral Odyssey | Signup';
    const navigate = useNavigate();
    const accountContext = useContext(AccountContext)!;

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'yes') {
        navigate('/');
    }

    const usernameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const handleOnClickWrapper = () => {
        try {
            const inputFields = handleOnClick(usernameInput, emailInput, passwordInput);
            try {
                //const URL = 'http://localhost:5000/api/user/signup';
                //const URL = 'http://3.79.63.224:5000/api/user/signup';
                //const URL = 'http://13.49.23.168:80/api/accounts/registerAccount';
                const URL = 'http://localhost:4000/api/accounts/registerAccount';
                //'http://3.79.63.224:5000/api/user/signup';

                axios.post(URL, inputFields).then((response) => {
                    console.log(response.data);
                    const user = new Account(
                        response.data.user.id,
                        response.data.user.username,
                        'email',
                        response.data.user.password,
                        Boolean(0),
                    );
                    accountContext.setAccount(user);
                    localStorage.setItem('isLoggedIn', 'yes');
                    navigate('/');
                });
            } catch (error) {
                console.error(error);
            }
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const layoutTitle: string = 'Astral Odyssey | Signup';

    return (
        <Layout title={layoutTitle}>
            <div className='main-page' data-testid='main-page-id'>
                <div className='main-page-container'>
                    <div className='main-title'>{layoutTitle}</div>
                    <SignupForm usernameInput={usernameInput} emailInput={emailInput} passwordInput={passwordInput} />
                    <div className='buttons'>
                        <Button
                            type='submit'
                            buttonMessage='Signup'
                            onClick={handleOnClickWrapper}
                            data-testid='signup-button-id'
                            className='button-dark'
                        />
                        <Button
                            type='submit'
                            buttonMessage='Login'
                            onClick={() => navigate('/login')}
                            data-testid='login-button-id'
                            className='button-dark'
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SignupPage;
