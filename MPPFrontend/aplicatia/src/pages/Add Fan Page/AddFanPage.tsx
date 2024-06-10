import { Fan } from '../../models/fan';
import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';

import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { FansContext } from '../../contexts/FanContext';
import { FanForm } from '../../features/CRUD Operations/Form Fan/FormFan';
import { useFanStore } from '../../store/useFanStore';
import './AddFanPage.css';

function handleOnClick(
    userIdInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
): { userId: number; name: string; pictureUrl: string } {
    if (!nameInput.current!.value || !urlInput.current!.value || !userIdInput.current!.value)
        throw new Error('You must provide values for each field!');

    const userId: number = parseInt(userIdInput.current!.value),
        name: string = nameInput.current!.value,
        pictureUrl: string = urlInput.current!.value;

    return { userId, name, pictureUrl };
}

export default function AddFanPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    document.title = 'Add fan';

    const userIdInput = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const addFanStore = useFanStore((state) => state.addFan);

    const fansContext = useContext(FansContext)!;
    //axios
    const handleOnClickWrapper = () => {
        try {
            const inputFan = handleOnClick(userIdInput, nameInput, urlInput);

            addFanStore(new Fan(inputFan.userId, inputFan.name, inputFan.pictureUrl));
            fansContext.addFan(new Fan(inputFan.userId, inputFan.name, inputFan.pictureUrl));

            axios({
                method: 'post',
                url: 'http://localhost:4000/api/fans/addFan',
                //url: 'http://13.49.23.168:80/api/fans/addFan',
                data: inputFan,
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
                //.post('http://localhost:4000/api/users/addUser', inputUser)
                .then(() => {
                    console.log('Fan add started!');
                    console.log('Fan add worked!');
                })
                .catch((error) => {
                    console.error('Error adding fan:', error);
                });
            navigate('/displayFans');
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
                <div className='main-title'>Add Fan</div>

                <FanForm userIdInput={userIdInput} nameInput={nameInput} urlInput={urlInput} data-testid='fan-form' />

                <Button type='submit' buttonMessage='Add fan' className='form-button' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
