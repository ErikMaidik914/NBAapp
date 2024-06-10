import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../features/Auth/LoginForm/LoginForm';
import { Account } from '../../models/account';
import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';
import './LoginPage.css';

function handleOnClick(
    usernameInput: React.RefObject<HTMLInputElement>,
    passwordInput: React.RefObject<HTMLInputElement>,
): { username: string; password: string } {
    if (!usernameInput.current || !passwordInput.current) {
        throw new Error('Null references');
    }

    if (!usernameInput.current!.value || !passwordInput.current!.value) {
        throw new Error('All fields are required');
    }

    const userUsername: string = usernameInput.current!.value;
    const userPassword: string = passwordInput.current!.value;

    const inputFields = {
        username: userUsername,
        password: userPassword,
    };

    return inputFields;
}

const LoginPage = () => {
    document.title = 'NBA | Login';

    const navigate = useNavigate();

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    //const userContext = useContext(AccountContext)!;

    const handleOnClickWrapper = () => {
        try {
            const inputFields = handleOnClick(usernameInput, passwordInput);
            try {
                //const URL = 'http://localhost:5000/api/user/login';
                //const URL = `http://3.79.63.224:5000/api/user/login`;

                const URL = 'http://localhost:4000/api/accounts/login';
                //const URL = 'http://13.49.23.168:80/api/accounts/login';

                //console.log(inputFields);

                axios.post(URL, inputFields).then((response) => {
                    console.log(response.data);
                    const currentUser = new Account(
                        response.data.accountId,
                        response.data.username,
                        // response.data.user.email,
                        // 'password',
                        'email',
                        response.data.password,
                        Boolean(0),
                    );
                    console.log(currentUser);
                    //userContext.setAccount(currentUser);
                    localStorage.setItem('isLoggedIn', 'yes');
                    sessionStorage.setItem('userToken', JSON.stringify(response.data.token));
                    navigate('/');
                });
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const layoutTitle: string = 'NBA | Login';

    return (
        <Layout title={layoutTitle}>
            <div className='main-page' data-testid='main-page-id'>
                <div className='main-page-container'>
                    <div className='main-title'>{layoutTitle}</div>
                    <LoginForm usernameInput={usernameInput} passwordInput={passwordInput} />
                    <div className='buttons'>
                        <Button
                            type='submit'
                            buttonMessage='Login'
                            onClick={handleOnClickWrapper}
                            data-testid='Login-button-id'
                            className='button-dark'
                        />
                        <Button
                            type='submit'
                            buttonMessage='Signup'
                            onClick={() => navigate('/signup')}
                            data-testid='signup-button-id'
                            className='button-dark'
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
