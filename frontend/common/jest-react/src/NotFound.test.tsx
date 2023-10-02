import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from "./NotFound";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Users from "./Users";
import React from "react";
import AppRouter from './Router';

//routing


export const renderWithRouter = (path = '/') => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <AppRouter/>
        </MemoryRouter>
    )
}

test('not found test ' , () => {
    renderWithRouter('/not_found')
    const getUsers = () => screen.queryByTestId('users-page')
    const getNotFound = () => screen.queryByTestId('not-found-page')
    expect(getUsers()).toBeNull()
    expect(getNotFound()).toBeInTheDocument()
    const link = screen.getByTestId('link')
    fireEvent.click(link)
    expect(getUsers()).toBeInTheDocument()
    expect(getNotFound()).toBeNull()
})
//async requests

test('not found test 2', async () => {
    renderWithRouter('/not_found')
    const response = await screen.findByTestId('test-test')
    expect(response).toBeInTheDocument()
    expect(response).toHaveTextContent('test!')
})
