import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

const mockStorageDrinks = [
  {
    alcoholicOrNot: '',
    category: 'Pork',
    doneDate: '',
    id: '52948',
    image: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
    link: '/meals/52948',
    name: 'Wontons',
    nationality: 'Chinese',
    tags: ['MainMeal'],
    type: 'meal',
  },
];

describe('Testa a aplicação', () => {
  test('Tela de profile', async () => {
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

    userEvent.click(doneRecipesButton);

    const doneRecipesTitle = screen.getByRole('heading', { name: /Done Recipes/i, level: 1 });
    expect(doneRecipesTitle).toBeInTheDocument();

    const buttonFilterAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonFilterAll);
  });
  test('test Done Recipes Filter', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('doneRecipes', JSON.stringify(mockStorageDrinks));

    renderPath('done-recipes');

    const buttonFilter = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(buttonFilter);

    const buttonFilterAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonFilterAll);
  });
});
