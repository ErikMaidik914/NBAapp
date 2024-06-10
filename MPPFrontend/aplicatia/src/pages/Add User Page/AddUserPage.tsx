import { User } from '../../models/user';
import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';

import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
//import * as rax from 'retry-axios';
import { UsersContext } from '../../contexts/UserContext';
import { UserForm } from '../../features/CRUD Operations/Form User/FormUser';
import { useUserStore } from '../../store/useUserStore';
import './AddUserPage.css';

function handleOnClick(
    nameInput: React.RefObject<HTMLInputElement>,
    teamameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
    ageInput: React.RefObject<HTMLInputElement>,
): { name: string; team: string; pictureUrl: string; age: number } {
    if (!nameInput.current!.value || !teamameInput.current!.value || !urlInput.current!.value || !ageInput.current!.value)
        throw new Error('You must provide values for each field!');

    const name: string = nameInput.current!.value,
        team: string = teamameInput.current!.value,
        pictureUrl: string = urlInput.current!.value,
        age: number = parseInt(ageInput.current!.value);

    return { name, team, pictureUrl, age };
}

export default function AddUserPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    document.title = 'Add user';

    const nameInput = useRef<HTMLInputElement>(null);
    const teamInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    //const interceptorId = rax.attach();

    const addUserStore = useUserStore((state) => state.addUser);

    const usersContext = useContext(UsersContext)!;
    //axios
    const handleOnClickWrapper = () => {
        try {
            const inputUser = handleOnClick(nameInput, teamInput, urlInput, ageInput);

            addUserStore(new User(inputUser.name, inputUser.team, inputUser.pictureUrl, inputUser.age));
            usersContext.addUser(new User(inputUser.name, inputUser.team, inputUser.pictureUrl, inputUser.age));

            axios({
                method: 'post',
                url: 'http://localhost:4000/api/users/addUser',
                //url: 'http://13.49.23.168:80/api/users/addUser',
                data: inputUser,
                raxConfig: {
                    instance: axios,
                    retry: 3,
                    noResponseRetries: 3,
                    retryDelay: 1000,
                    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
                    statusCodesToRetry: [
                        [100, 199],
                        [429, 429],
                        [500, 599],
                    ],
                },
            })
                //.post('http://localhost:4000/api/users/addUser', inputUser)
                .then(() => {
                    console.log('User add started!');
                    console.log('User add worked!');
                })
                .catch((error) => {
                    console.error('Error adding user:', error);
                });
            navigate('/');
            // .finally(() => {
            //     console.log('User add finished!');
            //     addUserStore(new User(inputUser.name, inputUser.team, inputUser.pictureUrl, inputUser.age));
            //     navigate('/');
            // });
        } catch (error) {
            console.error('Error handling input:', error);
        }
    };

    return (
        <Layout>
            <div className='main-page-container' data-testid='main-page-container'>
                <div className='main-title'>Add user</div>

                <UserForm nameInput={nameInput} teamInput={teamInput} urlInput={urlInput} ageInput={ageInput} data-testid='user-form' />

                <Button type='submit' buttonMessage='Add user' className='form-button' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
