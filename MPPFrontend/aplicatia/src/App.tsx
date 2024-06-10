import './App.css';
import { User } from './models/user';

import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import axios from 'axios';
import * as rax from 'retry-axios';
import ConnectionStatus from './ConnectionStatus';
import { FansContextProvider } from './contexts/FanContext';
import { ModalContextProvider } from './contexts/ModalContext';
import { UsersContextProvider } from './contexts/UserContext';
import { Fan } from './models/fan';
import ChartPage from './pages/Chart Page/ChartPage';
import LoadingPage from './pages/Loading Page/LoadingPage';
import LoginPage from './pages/Login Page/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { useFanStore } from './store/useFanStore';
import { useUserStore } from './store/useUserStore';

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

const DisplayFansPage = React.lazy(() => import('./pages/Display Data Page/DisplayFansPage'));
const AddFanPage = React.lazy(() => import('./pages/Add Fan Page/AddFanPage'));
const EditFanPage = React.lazy(() => import('./pages/Edit Fan Page/EditFanPage'));

function App() {
    //const navigate = useNavigate();

    // useEffect(() => {
    //     const user = localStorage.getItem('user');

    //     if (!user) {
    //         navigate('/login');
    //     }
    // }, [navigate]);
    // let [users, setUsers] = useState<User[]>([demoUser1, demoUser2, demoUser3, demoUser4, demoUser5, demoUser6, demoUser7]);
    const [users, setUsers] = useState<User[]>([]);
    const [fans, setFans] = useState<Fan[]>([]);

    const setUserStore = useUserStore((state) => state.setUsers);
    const getUsersStore = useUserStore((state) => state.getUsers);
    const setFanStore = useFanStore((state) => state.setFans);
    const getFansStore = useFanStore((state) => state.getFans);
    //const interceptorId = rax.attach();

    // useEffect(() => {
    //     const socket = io('http://localhost:4000', { transports: ['websocket'] });
    //     socket.on('newUser', (newUser: any) => {
    //         console.log(newUser);
    //         const myUser = new User(newUser.name, newUser.team, 'nacho.jpeg', newUser.age);
    //         setUsers((prevUsers) => [...prevUsers, myUser]);
    //         //fetchUsers();
    //         console.log('good');
    //     });
    // });

    let [modalStatus, setModalStatus] = useState<boolean>(false);
    let [userId, setUserId] = useState<number>(-1);
    let [fanId, setFanId] = useState<number>(-1);

    const addUser = (newUser: User) => {
        setUsers((prevState: User[]) => [...prevState, newUser]);
    };

    const removeUser = (userId: number) => {
        setUsers((prevState: User[]) => prevState.filter((user) => user.getId() !== userId));
    };

    //fans
    const addFan = (newFan: Fan) => {
        setFans((prevState: Fan[]) => [...prevState, newFan]);
    };

    const removeFan = (fanId: number) => {
        setFans((prevState: Fan[]) => prevState.filter((fan) => fan.getId() !== fanId));
    };

    //const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = () => {
        const data = getUsersStore();

        const users = data.map((user: any) => new User(user.name, user.team, 'nacho.jpeg', user.age));

        setUsers(users);
        axios({
            url: 'http://localhost:4000/api/users',
            //url: 'http://13.49.23.168:80/api/users',
            method: 'GET',
            raxConfig: {
                retry: 100,
                noResponseRetries: 100,
                retryDelay: 1000,
                httpMethodsToRetry: ['GET'],
                statusCodesToRetry: [
                    [100, 199],
                    [429, 429],
                    [500, 599],
                ],
                onRetryAttempt: (err) => {
                    const cfg = rax.getConfig(err);
                    console.log(`Retry attempt #${cfg?.currentRetryAttempt}`);
                },
            },
        })
            //.get('http://localhost:4000/api/users')
            .then((response) => {
                const users = response.data.map((user: any) => new User(user.name, user.team, 'nacho.jpeg', user.age));

                setUsers(users);
                setUserStore(users);
                //setCurrentUsers(users);
            });
        // .catch((error) => {
        //     console.error('Error fetching users:', error);
        //     console.log(getUsersStore());
        //     const data = getUsersStore();

        //     const users = data.map((user: any) => new User(user.name, user.team, 'nacho.jpeg', user.age));

        //     setUsers(users);
        // });
    };

    const fetchFans = () => {
        const data = getFansStore();

        const fans = data.map((fan: any) => new Fan(fan.userId, fan.name, 'nacho.jpeg'));

        setFans(fans);
        axios({
            url: 'http://localhost:4000/api/fans',
            //url: 'http://13.49.23.168:80/api/fans',
            method: 'GET',
            raxConfig: {
                retry: 100,
                noResponseRetries: 100,
                retryDelay: 1000,
                httpMethodsToRetry: ['GET'],
                statusCodesToRetry: [
                    [100, 199],
                    [429, 429],
                    [500, 599],
                ],
                onRetryAttempt: (err) => {
                    const cfg = rax.getConfig(err);
                    console.log(`Retry attempt #${cfg?.currentRetryAttempt}`);
                },
            },
        })
            //.get('http://localhost:4000/api/users')
            .then((response) => {
                const fans = response.data.map((fan: any) => new Fan(fan.userId, fan.name, 'nacho.jpeg'));

                setFans(fans);
                setFanStore(fans);
                //setCurrentUsers(users);
            });
        // .catch((error) => {
        //     console.error('Error fetching users:', error);
        //     console.log(getUsersStore());
        //     const data = getUsersStore();

        //     const users = data.map((user: any) => new User(user.name, user.team, 'nacho.jpeg', user.age));

        //     setUsers(users);
        // });
    };

    useEffect(() => {
        fetchUsers();
        fetchFans();
    }, []);

    return (
        <UsersContextProvider userContext={{ users, addUser, removeUser }}>
            <FansContextProvider fanContext={{ fans, addFan, removeFan }}>
                <ModalContextProvider
                    modalContext={{ modalStatus, setModalStatus, userId, setUserId, removeUser, fanId, setFanId, removeFan }}
                >
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
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='/signup' element={<SignupPage />} />

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

                            <Route
                                path='/addFan'
                                element={
                                    <Suspense fallback={<LoadingPage />}>
                                        <AddFanPage />
                                    </Suspense>
                                }
                            />

                            <Route
                                path='/editFan/:fanId'
                                element={
                                    <Suspense fallback={<LoadingPage />}>
                                        <EditFanPage />
                                    </Suspense>
                                }
                            />

                            <Route
                                path='/displayFans'
                                element={
                                    <Suspense fallback={<LoadingPage />}>
                                        <DisplayFansPage />
                                    </Suspense>
                                }
                            />

                            <Route path='/chart' element={<ChartPage />} />

                            <Route path='*' element={<Navigate to={'/'} />} />
                        </Routes>
                    </BrowserRouter>
                </ModalContextProvider>
            </FansContextProvider>
        </UsersContextProvider>
    );
}

export default App;
