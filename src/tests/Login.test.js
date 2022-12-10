import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

describe('Testa a aplicação', () => {
  test('Tela de login', () => {
    renderPath('/');
    const inputEmailElement = screen.getByTestId('email-input');
    const inputPasswordElement = screen.getByTestId('password-input');
    const buttonElement = screen.getByRole('button', { name: /Enter/i });

    expect(inputEmailElement).toBeInTheDocument();
    expect(inputPasswordElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();

    userEvent.type(inputEmailElement, 'luisfernandesneto@gmail.com');
    userEvent.type(inputPasswordElement, 'xablaus');
    userEvent.click(buttonElement);
  });
});
