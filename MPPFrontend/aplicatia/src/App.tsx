import './App.css';
import { User } from './models/user';

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import axios from 'axios';
import { io } from 'socket.io-client';
import ConnectionStatus from './ConnectionStatus';
import { ModalContextProvider } from './contexts/ModalContext';
import { UsersContextProvider } from './contexts/UserContext';
import ChartPage from './pages/Chart Page/ChartPage';
import LoadingPage from './pages/Loading Page/LoadingPage';

// let demoUser1: User = new User('Michael Jordan', 'Bulls', 'nacho.jpeg', 1);
// let demoUser2: User = new User('Stephen Curry', 'Warriors', 'nacho.jpeg', 30);
// let demoUser3: User = new User('User3', 'Test', 'nacho.jpeg', 18);
// let demoUser4: User = new User('User4', 'Test', 'nacho.jpeg', 24);
// let demoUser5: User = new User('User5', 'Test', 'nacho.jpeg', 25);
// let demoUser6: User = new User('User6', 'Test', 'nacho.jpeg', 24);
// let demoUser7: User = new User('User7', 'Test', 'nacho.jpeg', 28);

const DisplayUsersPage = React.lazy(() => import('./pages/Display Data Page/DisplayUsersPage'));
const AddUserPage = React.lazy(() => import('./pages/Add User Page/AddUserPage'));
const EditUserPage = React.lazy(() => import('./pages/Edit User Page/EditUserPage'));

function App() {
    // let [users, setUsers] = useState<User[]>([demoUser1, demoUser2, demoUser3, demoUser4, demoUser5, demoUser6, demoUser7]);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const socket = io('http://localhost:4000', { transports: ['websocket'] });
        socket.on('newUser', (newUser: any) => {
            const myUser = new User(newUser.name, newUser.team, 'nacho.jpeg', newUser.age);
            setUsers((prevUsers) => [...prevUsers, myUser]);
            console.log('good');
        });
    });

    let [modalStatus, setModalStatus] = useState<boolean>(false);
    let [userId, setUserId] = useState<number>(-1);

    const addUser = (newUser: User) => {
        setUsers((prevState: User[]) => [...prevState, newUser]);
    };

    const removeUser = (userId: number) => {
        setUsers((prevState: User[]) => prevState.filter((user) => user.getId() !== userId));
    };

    //const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = () => {
        axios
            .get('http://localhost:4000/api/users')
            .then((response) => {
                const users = response.data.map((user: any) => new User(user.name, user.team, 'nacho.jpeg', user.age));
                setUsers(users);
                //setCurrentUsers(users);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log(users);
    });

    return (
        <UsersContextProvider userContext={{ users, addUser, removeUser }}>
            <ModalContextProvider modalContext={{ modalStatus, setModalStatus, userId, setUserId, removeUser }}>
                <ConnectionStatus></ConnectionStatus>
                <BrowserRouter>
                    <Routes>
                        <Route path='/loading' element={<LoadingPage />} />

                        <Route
                            path='/'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <DisplayUsersPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/addUser'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <AddUserPage />
                                </Suspense>
                            }
                        />

                        <Route
                            path='/editUser/:userId'
                            element={
                                <Suspense fallback={<LoadingPage />}>
                                    <EditUserPage />
                                </Suspense>
                            }
                        />

                        <Route path='/chart' element={<ChartPage />} />

                        <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                </BrowserRouter>
            </ModalContextProvider>
        </UsersContextProvider>
    );
}

export default App;
