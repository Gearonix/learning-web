import { render, screen, fireEvent } from '@testing-library/react';
import Users from './Users'
import {MemoryRouter} from 'react-router-dom'

test('users page', () => {
    render(
        <MemoryRouter>
            <Users />
        </MemoryRouter>
    )

})
