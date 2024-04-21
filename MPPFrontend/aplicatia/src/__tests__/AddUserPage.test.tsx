import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import { UsersContextProvider } from '../contexts/UserContext';
import AddUserPage from '../pages/Add User Page/AddUserPage';

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

test('test add user page rendering', () => {
    render(
        <BrowserRouter>
            <AddUserPage />
        </BrowserRouter>,
    );

    const mainPageContainer = screen.getByTestId('main-page-container');
    const addUserButton = screen.getByTestId('button-test-id');

    expect(mainPageContainer).toBeInTheDocument();
    expect(addUserButton).toBeInTheDocument();
});

test('test add user page add button without form data', () => {
    window.alert = vi.fn();

    render(
        <BrowserRouter>
            <AddUserPage />
        </BrowserRouter>,
    );

    const addUserButton = screen.getByTestId('button-test-id');

    fireEvent.click(addUserButton);

    expect(mockedUseNavigate.mock.calls.length).toBe(0);
});

test('test add user page add button with form data', () => {
    window.alert = vi.fn();

    render(
        <UsersContextProvider
            userContext={{
                users: [],
                addUser: vi.fn(),
                removeUser: vi.fn(),
            }}
        >
            <BrowserRouter>
                <AddUserPage />
            </BrowserRouter>
        </UsersContextProvider>,
    );

    const addUserButton = screen.getByTestId('button-test-id');

    const firstNameFormInput = screen.getByLabelText('Name');
    const lastNameFormInput = screen.getByLabelText('Team');
    const urlFormInput = screen.getByLabelText('URL');
    const ageFormInput = screen.getByLabelText('Age');

    fireEvent.change(firstNameFormInput, {
        target: {
            value: 'Michael Jordan',
        },
    });

    fireEvent.change(lastNameFormInput, {
        target: {
            value: 'Bulls',
        },
    });

    fireEvent.change(urlFormInput, {
        target: {
            value: 'nacho.jpeg',
        },
    });

    fireEvent.change(ageFormInput, {
        target: {
            value: 1,
        },
    });

    fireEvent.click(addUserButton);

    expect(mockedUseNavigate).toBeCalledWith('/');
});
