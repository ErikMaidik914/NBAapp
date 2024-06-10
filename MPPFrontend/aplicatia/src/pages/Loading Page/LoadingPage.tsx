import ReactLoading from 'react-loading';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

// #2196F3

export default function LoadingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div id='main-container' data-testid='main-container'>
            <ReactLoading data-testid='spinner' type='spinningBubbles' color='grey' height={100} width={100} />
        </div>
    );
}
