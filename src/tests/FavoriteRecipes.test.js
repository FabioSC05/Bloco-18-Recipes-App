import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

const mockStorage = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
];

const mockStorageDrinks = [
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    name: 'A1',
    nationality: '',
    type: 'drink',
  },
];

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

    userEvent.click(favoriteRecipesButton);

    const favoriteRecipesTitle = screen.getByRole('heading', { name: /favorite Recipes/i, level: 1 });
    expect(favoriteRecipesTitle).toBeInTheDocument();
  });
  test('Favorite recipes', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockStorage));

    renderPath('favorite-recipes');
    const favoriteRecipe = screen.getByTestId('0-horizontal-image');
    expect(favoriteRecipe).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteButton);

    const buttonFilter = screen.getByRole('button', { name: /meals/i });
    const buttonFilterDrinks = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(buttonFilter);
    userEvent.click(buttonFilterDrinks);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
  });
  test('Favorite Drinks', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockStorageDrinks));

    renderPath('favorite-recipes');

    const buttonFilter = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(buttonFilter);
  });
});
