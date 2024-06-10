import { useContext } from 'react';
import { Button } from '../shared/components/button/Button';

import axios from 'axios';
import { ModalContext } from '../contexts/ModalContext';

import { useUserStore } from '../store/useUserStore';
import './DeleteUserModal.css';

export const DeleteUserModal = () => {
    const modalContext = useContext(ModalContext)!;
    let modalStatus = modalContext.modalStatus;
    let setModalStatus = modalContext.setModalStatus;
    const removeUser = modalContext.removeUser;
    const userId = modalContext.userId;
    //const interceptorId = rax.attach();

    const deleteUserStore = useUserStore((state) => state.removeUser);

    const handleYesClick = () => {
        setModalStatus(false);
        removeUser(userId);
        deleteUserStore(userId);
        axios({
            method: 'delete',
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
    };

    return (
        modalStatus && (
            <div id='modal-overlay' data-testid='modal-overlay-test' onClick={() => setModalStatus(false)}>
                <div id='modal-card' data-testid='modal-card-test' onClick={(e) => e.stopPropagation()}>
                    <div id='modal-text'>Are you sure you want to remove this user?</div>

                    <div id='buttons-list'>
                        <Button type='button' data_test_id='yes-button' buttonMessage='Yes' color='#4CAF50' onClick={handleYesClick} />
                        <Button
                            type='button'
                            data_test_id='no-button'
                            buttonMessage='No'
                            color='#E53935'
                            onClick={() => setModalStatus(false)}
                        />
                    </div>
                </div>
            </div>
        )
    );
};
