import { useContext, useEffect, useState } from 'react';

import { UserCard } from '../../features/Display Users/UserCard';
import { User } from '../../models/user';
import { Layout } from '../../shared/components/layout/Layout';

import { UsersContext } from '../../contexts/UserContext';
import { DeleteUserModal } from '../../modals/DeleteUserModal';
import { Button } from '../../shared/components/button/Button';
import './DisplayUsersPage.css';

export default function DisplayUsersPage() {
    document.title = 'Players dashboard';

    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 5; // Number of users to display per page

    const usersContext = useContext(UsersContext)!;
    const allUsers: User[] = usersContext.users;

    // Sorting logic (unchanged)
    useEffect(() => {
        allUsers.sort((firstUser, secondUser) => {
            return firstUser.getAge() - secondUser.getAge();
        });
        if (!isAscending) allUsers.reverse();
    }, [isAscending]);

    // Calculate the current set of users to display based on pagination
    const currentUsers = allUsers.slice(0, currentPage * pageSize);

    // Handle button click to show the next page
    const handleOnClick = () => {
        if (currentPage * pageSize + pageSize) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Check if there are more pages to show (for the "Show more" button)
    const hasMorePages = currentPage * pageSize <= allUsers.length;

    return (
        <Layout>
            <div className='main-page-container'>
                <DeleteUserModal />

                <Button className='stick' type='button' onClick={() => setIsAscending(!isAscending)} buttonMessage='Ascending/Descending' />

                <div className='users-list' data-testid='users-list'>
                    {currentUsers.map((user) => (
                        <UserCard givenUser={user} key={user.getId()} />
                    ))}
                </div>

                {hasMorePages && <Button onClick={handleOnClick} type='button' buttonMessage='Show more' />}

                <div>
                    {currentUsers.length} out of {allUsers.length}
                </div>
            </div>
        </Layout>
    );
}
