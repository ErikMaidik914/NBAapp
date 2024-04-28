import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import { FanCardPropsType } from '../../types/FanCardPropsType.types';
import './FanCard.css';

export function FanCard({ givenFan }: FanCardPropsType) {
    let path: string = 'assets/' + givenFan.getPictureUrl();

    const navigate = useNavigate();

    const handleCardOnClick = () => {
        navigate('/editFan/' + givenFan.getId());
    };

    const modalContext = useContext(ModalContext)!;
    const setFanId = modalContext.setFanId;
    const setModalStatus = modalContext.setModalStatus;

    return (
        <div className='card' data-testid='fan-card' onClick={handleCardOnClick}>
            <button
                className='remove-button'
                data-testid='remove-button'
                onClick={(e) => {
                    e.stopPropagation();
                    setModalStatus(true);
                    setFanId(givenFan.getId());
                    // removeMethod(givenFan.getId());
                }}
            >
                X
            </button>

            <div className='card-info' data-testid='card-info'>
                <div className='picture'>
                    <img src={path} alt='fan profile' />
                </div>

                <div className='fan-info'>
                    <div className='name'>Name: {givenFan.getName()}</div>
                    <div className='userId'>User Id: {givenFan.getUserId()}</div>
                </div>
            </div>
        </div>
    );
}
