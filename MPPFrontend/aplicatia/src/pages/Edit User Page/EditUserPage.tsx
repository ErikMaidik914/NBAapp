import { User } from '../../models/user';
import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';

import { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { UsersContext } from '../../contexts/UserContext';
import { UserForm } from '../../features/CRUD Operations/Form User/FormUser';
import { useUserStore } from '../../store/useUserStore';
import './EditUserPage.css';

function handleOnClick(
    nameInput: React.RefObject<HTMLInputElement>,
    teamInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
    ageInput: React.RefObject<HTMLInputElement>,
) {
    if (!nameInput.current!.value || !teamInput.current!.value || !urlInput.current!.value || !ageInput.current!.value)
        throw new Error('You must provide values for each field!');

    const userName: string = nameInput.current!.value,
        userTeam: string = teamInput.current!.value,
        userUrl: string = urlInput.current!.value,
        age: number = parseInt(ageInput.current!.value);

    return new User(userName, userTeam, userUrl, age);
}

export default function EditUserPage() {
    document.title = 'Edit User';

    const nameInput = useRef<HTMLInputElement>(null);
    const teamInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    const usersContext = useContext(UsersContext)!;

    const { userId } = useParams();
    const updateUserStore = useUserStore((state) => state.updateUser);

    const givenUser = usersContext.users.find((user: User) => user.getId() === parseInt(userId!));

    useEffect(() => {
        if (!givenUser) navigate('/');
    });

    const handleOnClickWrapper = () => {
        try {
            const newUser = handleOnClick(nameInput, teamInput, urlInput, ageInput);
            usersContext.removeUser(givenUser!.getId());
            usersContext.addUser(newUser);

            axios({
                method: 'put',
                url: `http://localhost:4000/api/users/${userId}`,
                //url: `http://13.49.23.168:80/api/users/${userId}`,
                raxConfig: {
                    instance: axios,
                    retry: 100,
                    noResponseRetries: 100,
                    retryDelay: 1000,
                    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
                    statusCodesToRetry: [
                        [100, 199],
                        [429, 429],
                        [500, 599],
                    ],
                },
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });

            navigate('/');
        } catch (error) {
            alert(error);
        } finally {
            updateUserStore(
                new User(nameInput.current!.value, teamInput.current!.value, urlInput.current!.value, parseInt(ageInput.current!.value)),
            );
        }
    };

    const profileImagePath = '../assets/' + givenUser?.getPictureUrl();

    return (
        <Layout>
            <div className='main-page-container'>
                <img src={profileImagePath} alt='profile image' id='profile-picture' />

                <UserForm nameInput={nameInput} teamInput={teamInput} urlInput={urlInput} ageInput={ageInput} givenUser={givenUser} />

                <Button type='submit' data_test_id='edit-user-button' buttonMessage='Edit User' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
