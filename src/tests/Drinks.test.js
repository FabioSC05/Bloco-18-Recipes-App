import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa a aplicação', () => {
  test('Tela de profile', () => {
    renderPath('/meals');

    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const profileButton = screen.getByTestId('profile-top-btn');
    const searchButton = screen.getByTestId('search-top-btn');
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();

    userEvent.click(drinksButton);

    const drinksTitle = screen.getByRole('heading', { name: /Drinks/i, level: 1 });
    expect(drinksTitle).toBeInTheDocument();
  });
});

describe('Testa o componente recipes', () => {
  test('Testa a meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink)
        .mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals),
    });
    const { history } = renderPath('/drinks/178319');
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const firstIngredient = await screen.findByText(/Aquamarine/i);
    expect(firstIngredient).toBeInTheDocument();
    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toHaveProperty('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');
    userEvent.click(screen.getByTestId('share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
    expect(favoriteButton.children[0]).toHaveProperty('src', 'http://localhost/drinks/blackHeartIcon.svg');
    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);
    const allSteps = screen.getAllByRole('checkbox');
    userEvent.click(allSteps[0]);
    expect(allSteps[0]).toBeChecked();
    userEvent.click(allSteps[0]);
    expect(allSteps[0]).not.toBeChecked();
    expect(allSteps).toHaveLength(3);
    const finishRecipe = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipe).toBeDisabled();
    allSteps.forEach((step) => {
      expect(step).not.toBeChecked();
      userEvent.click(step);
      expect(step).toBeChecked();
    });
    expect(finishRecipe).toBeEnabled();
    userEvent.click(finishRecipe);
    act(() => {
      history.push('/profile');
      history.push('/drinks/178319/in-progress');
    });
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
    await act(async () => {
      history.push('/drinks/178319');
      await waitFor(() => expect(startButton).not.toBeInTheDocument());
    });
  });
});
