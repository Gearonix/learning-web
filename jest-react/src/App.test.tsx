import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from './NotFound.test';

test('renders learn react link', () => {
  renderWithRouter()
  expect(screen.queryByTestId('not-found-page')).toBeNull()

});
