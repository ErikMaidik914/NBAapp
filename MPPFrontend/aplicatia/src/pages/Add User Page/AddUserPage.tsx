import { User } from '../../models/user';
import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';

import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { UsersContext } from '../../contexts/UserContext';
import { UserForm } from '../../features/CRUD Operations/Form User/FormUser';
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
    document.title = 'Add user';

    const nameInput = useRef<HTMLInputElement>(null);
    const teamInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const ageInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const usersContext = useContext(UsersContext)!;
    //axios
    const handleOnClickWrapper = () => {
        try {
            const inputUser = handleOnClick(nameInput, teamInput, urlInput, ageInput);
            //console.log('nigga');
            axios
                .post('http://localhost:4000/api/users/addUser', inputUser)
                .then(() => {
                    console.log('User add started!');
                    usersContext.addUser(new User(inputUser.name, inputUser.team, inputUser.pictureUrl, inputUser.age));
                    console.log('User add worked!');
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error adding user:', error);
                });
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
