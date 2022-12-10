import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import mealCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinks from '../../cypress/mocks/drinks';

const elementSearch = 'search-top-btn';
const elementInput = 'search-input';
const elementNameRadio = 'name-search-radio';
const elementButton = 'exec-search-btn';

window.alert = jest.fn();

const mockValue = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(meals),
  });
};
const path = '/meals/52771';
const cardImg = '0-card-img';

describe('Testa a meals', () => {
  test('Tela meals', async () => {
    mockValue();
    renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();
    const searchButton = screen.getByTestId(elementSearch);

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId(elementInput);
    expect(inputSearch).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId(elementNameRadio);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');

    const sendButton = screen.getByTestId(elementButton);
    userEvent.type(inputSearch, 'Onion');
    userEvent.click(ingredientRadio);
    userEvent.click(sendButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    const ingredientElement = await screen.findByTestId(cardImg);
    expect(ingredientElement).toBeInTheDocument();
    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);
    const nameElement = await screen.findByTestId(cardImg);
    expect(nameElement).toBeInTheDocument();

    userEvent.type(inputSearch, 'Chicken');
    userEvent.click(firstLetterRadio);
    userEvent.click(sendButton);

    const firstLetterElement = await screen.findByTestId(cardImg);
    expect(firstLetterElement).toBeInTheDocument();
  });
});
describe('Testa meals', () => {
  test('Tela one meal', async () => {
    window.alert.mockClear();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal).mockResolvedValueOnce(meals),
    });
    const { history } = renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();
    const searchButton = screen.getByTestId(elementSearch);
    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId(elementInput);
    expect(inputSearch).toBeInTheDocument();
    const nameRadio = screen.getByTestId(elementNameRadio);
    const sendButton = screen.getByTestId(elementButton);
    userEvent.type(inputSearch, 'Corba');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    await waitFor(() => expect(history.location.pathname).toBe(path));
  });
});
describe('Testa o componente recipes', () => {
  test('Testa a requisição de APIs', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealCategories),
    });
    renderPath('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    await waitFor(() => expect(screen.getByTestId('Vegetarian-category-filter')).toBeInTheDocument());

    const beefElement = screen.getByTestId('Vegetarian-category-filter');
    userEvent.click(beefElement);
    await waitFor(() => expect(screen.getByText(/beef and mustard/i)));
    userEvent.click(beefElement);
    await waitFor(() => expect(screen.getByText(/big mac/i)));
    const allButton = screen.getByTestId('All-category-filter');
    userEvent.click(allButton);
  });
});

describe('Testa o componente recipes', () => {
  test('Testa a meals', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal)
        .mockResolvedValueOnce(oneMeal)
        .mockResolvedValueOnce(drinks),
    });
    const { history } = renderPath(path);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    const firstIngredient = await screen.findByText(/penne rigate/i);
    expect(firstIngredient).toBeInTheDocument();
    window.document.execCommand = jest.fn().mockImplementation(() => 'copied');
    userEvent.click(screen.getByTestId('share-btn'));
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    const favoriteButton = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteButton);
    expect(favoriteButton.children[0]).toHaveProperty('src', 'http://localhost/meals/blackHeartIcon.svg');
    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);
    const allSteps = screen.getAllByRole('checkbox');
    userEvent.click(allSteps[0]);
    expect(allSteps[0]).toBeChecked();
    userEvent.click(allSteps[0]);
    expect(allSteps[0]).not.toBeChecked();
    expect(allSteps).toHaveLength(8);
    const finishRecipe = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipe).toBeDisabled();
    allSteps.forEach((step) => {
      expect(step).not.toBeChecked();
      userEvent.click(step);
      expect(step).toBeChecked();
    });
    expect(finishRecipe).toBeEnabled();
    act(() => {
      history.push('/profile');
      history.push('/meals/52771/in-progress');
    });
    allSteps.forEach((step) => {
      expect(step).toBeChecked();
    });
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');

    const buttonShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(buttonShare);

    const buttonFilter = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(buttonFilter);
  });
});
