import { useContext, useEffect, useState } from 'react';

import { FanCard } from '../../features/Display Fans/FanCard';
import { Fan } from '../../models/fan';
import { Layout } from '../../shared/components/layout/Layout';

import { useNavigate } from 'react-router-dom';
import { FansContext } from '../../contexts/FanContext';
import { Button } from '../../shared/components/button/Button';
import './DisplayUsersPage.css';

export default function DisplayFansPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user-store');

        if (!user) {
            navigate('/login');
        }
    }, [navigate]);
    document.title = 'Fans dashboard';

    // const [isAscending, setIsAscending] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5; // Number of users to display per page

    const fansContext = useContext(FansContext)!;
    const allFans: Fan[] = fansContext.fans;

    // Calculate the current set of users to display based on pagination
    const currentFans = allFans.slice(0, currentPage * pageSize);

    // Handle button click to show the next page
    const handleOnClick = () => {
        if (currentPage * pageSize + pageSize) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Check if there are more pages to show (for the "Show more" button)
    const hasMorePages = currentPage * pageSize <= allFans.length;

    return (
        <Layout>
            <div className='main-page-container'>
                <div className='fans-list' data-testid='fans-list'>
                    {currentFans.map((fan) => (
                        <FanCard givenFan={fan} key={fan.getId()} />
                    ))}
                </div>

                {hasMorePages && <Button onClick={handleOnClick} type='button' buttonMessage='Show more' />}

                <div>
                    {currentFans.length} out of {allFans.length}
                </div>
            </div>
        </Layout>
    );
}
