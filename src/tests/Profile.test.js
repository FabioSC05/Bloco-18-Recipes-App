import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

describe('Testa a aplicação', () => {
  test('Tela de profile', () => {
    renderPath('/profile');

    const profiletitleElement = screen.getByRole('heading', { name: /Profile/i, level: 1 });
    expect(profiletitleElement).toBeInTheDocument();

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();

    const doneRecipesButton = screen.getByRole('button', { name: /Done Recipes/i });
    const favoriteRecipesButton = screen.getByRole('button', { name: /Favorite Recipes/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipesButton).toBeInTheDocument();
    expect(favoriteRecipesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();

    userEvent.click(logoutButton);
  });
});
