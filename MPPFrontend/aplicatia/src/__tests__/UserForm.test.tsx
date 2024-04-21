import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import { UserForm } from '../features/CRUD Operations/Form User/FormUser';
import { User } from '../models/user';

test('testing rendering of user form without user', () => {
    let ageInput = React.createRef<HTMLInputElement>();
    let nameInput = React.createRef<HTMLInputElement>();
    let teamInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    render(<UserForm nameInput={nameInput} teamInput={teamInput} urlInput={urlInput} ageInput={ageInput} />);

    const renderedUserForm = screen.getByTestId('user-form');
    const ageFormInput = screen.getByPlaceholderText('Age');
    const nameFormInput = screen.getByPlaceholderText('Name');
    const teamFormLabel = screen.getByText('Team');
    const urlFormLabel = screen.getByText('URL');

    expect(renderedUserForm).toBeInTheDocument();
    expect(ageFormInput).toBeInTheDocument();
    expect(nameFormInput).toBeInTheDocument();
    expect(teamFormLabel).toBeInTheDocument();
    expect(urlFormLabel).toBeInTheDocument();
});

test('testing rendering of user form with user', () => {
    let ageInput = React.createRef<HTMLInputElement>();
    let nameInput = React.createRef<HTMLInputElement>();
    let teamInput = React.createRef<HTMLInputElement>();
    let urlInput = React.createRef<HTMLInputElement>();

    let demoUser = new User('Michael Jordan', 'Bulls', 'nacho.jpeg', 1);

    render(<UserForm ageInput={ageInput} nameInput={nameInput} teamInput={teamInput} urlInput={urlInput} givenUser={demoUser} />);

    const renderedUserForm = screen.getByTestId('user-form');
    const ageFormInput = screen.getByDisplayValue('1');
    const nameFormInput = screen.getByDisplayValue('Michael Jordan');
    const ageFormLabel = screen.getByText('Age');
    const nameFormLabel = screen.getByText('Name');

    expect(renderedUserForm).toBeInTheDocument();
    expect(ageFormInput).toBeInTheDocument();
    expect(nameFormInput).toBeInTheDocument();
    expect(ageFormLabel).toBeInTheDocument();
    expect(nameFormLabel).toBeInTheDocument();
});
