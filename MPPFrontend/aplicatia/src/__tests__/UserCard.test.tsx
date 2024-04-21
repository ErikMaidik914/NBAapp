import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import { ModalContextProvider } from '../contexts/ModalContext';
import { UserCard } from '../features/Display Users/UserCard';
import { User } from '../models/user';

const { mockedUseNavigate } = vi.hoisted(() => {
    return {
        mockedUseNavigate: vi.fn(),
    };
});

vi.mock('react-router-dom', async () => {
    const router = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...router,
        useNavigate: () => mockedUseNavigate,
    };
});

test('test user card rendering', () => {
    const testUser = new User('Michael Jordan', 'Bulls', 'nacho.jpeg', 1);

    render(
        <BrowserRouter>
            <ModalContextProvider
                modalContext={{
                    modalStatus: false,
                    setModalStatus: vi.fn(),
                    userId: 0,
                    setUserId: vi.fn(),
                    removeUser: vi.fn(),
                }}
            >
                <UserCard givenUser={testUser} />
            </ModalContextProvider>
        </BrowserRouter>,
    );

    const userCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');

    const userName = screen.getByText('Name: Michael Jordan');
    const userImage = screen.getByAltText('user profile');

    expect(userCard).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userImage).toBeInTheDocument();
});

test('test user card remove method to be called', () => {
    const testUser = new User('Michael Jordan', 'Bulls', 'nacho.jpeg', 1);

    render(
        <BrowserRouter>
            <ModalContextProvider
                modalContext={{
                    modalStatus: false,
                    setModalStatus: vi.fn(),
                    userId: 0,
                    setUserId: vi.fn(),
                    removeUser: vi.fn(),
                }}
            >
                <UserCard givenUser={testUser} />
            </ModalContextProvider>
        </BrowserRouter>,
    );

    const userCard = screen.getByTestId('user-card');
    const removeButton = screen.getByTestId('remove-button');
    fireEvent.click(removeButton);
    fireEvent.click(userCard);

    expect(mockedUseNavigate).toBeCalledWith('/editUser/2');
});
