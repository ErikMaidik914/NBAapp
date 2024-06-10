import { Button } from '../../shared/components/button/Button';
import { Layout } from '../../shared/components/layout/Layout';

import { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { FansContext } from '../../contexts/FanContext';
import { FanForm } from '../../features/CRUD Operations/Form Fan/FormFan';
import { Fan } from '../../models/fan';
import { useFanStore } from '../../store/useFanStore';
import './EditUserPage.css';

function handleOnClick(
    userIdInput: React.RefObject<HTMLInputElement>,
    nameInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
) {
    if (!nameInput.current!.value || !urlInput.current!.value || !userIdInput.current!.value)
        throw new Error('You must provide values for each field!');

    const fanName: string = nameInput.current!.value,
        fanUrl: string = urlInput.current!.value,
        userId: number = parseInt(userIdInput.current!.value);

    return new Fan(userId, fanName, fanUrl);
}

export default function EditFanPage() {
    document.title = 'Edit Fan';

    const nameInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const userIdInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    const fansContext = useContext(FansContext)!;

    const { fanId } = useParams();
    const updateFanStore = useFanStore((state) => state.updateFan);

    const givenFan = fansContext.fans.find((fan: Fan) => fan.getId() === parseInt(fanId!));

    useEffect(() => {
        if (!givenFan) navigate('/');
    });

    const handleOnClickWrapper = () => {
        try {
            const newFan = handleOnClick(userIdInput, nameInput, urlInput);
            fansContext.removeFan(givenFan!.getId());
            fansContext.addFan(newFan);

            axios({
                method: 'put',
                url: `http://localhost:4000/api/users/${fanId}`,
                //url: `http://13.49.23.168:80/api/users/${fanId}`,
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
            updateFanStore(new Fan(parseInt(userIdInput.current!.value), nameInput.current!.value, urlInput.current!.value));
        }
    };

    const profileImagePath = '../assets/' + givenFan?.getPictureUrl();

    return (
        <Layout>
            <div className='main-page-container'>
                <img src={profileImagePath} alt='profile image' id='profile-picture' />

                <FanForm userIdInput={userIdInput} nameInput={nameInput} urlInput={urlInput} givenFan={givenFan} />

                <Button type='submit' data_test_id='edit-fan-button' buttonMessage='Edit Fan' onClick={handleOnClickWrapper} />
            </div>
        </Layout>
    );
}
