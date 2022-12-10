import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';
import meals from '../../cypress/mocks/meals';

const nullResult = {
  meals: null,
};

const mockValue = () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(nullResult).mockResolvedValueOnce(meals),
  });
};

describe('Testa os alertas', () => {
  test('Alertas na /meals', async () => {
    jest.spyOn(global, 'alert');
    global.alert.mockResolvedValue('alerta');
    mockValue();
    renderPath('/meals');
    const pageElement = screen.getByRole('heading', { name: /meals/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId('search-input');

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');

    const sendButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(ingredientRadio);
    userEvent.click(sendButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
describe('Testa os alertas', () => {
  test('Alertas na /drinks', async () => {
    jest.spyOn(global, 'alert');
    global.alert.mockResolvedValue('alerta');
    mockValue();
    renderPath('/drinks');
    const pageElement = screen.getByRole('heading', { name: /drinks/i, level: 1 });
    expect(pageElement).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);
    const inputSearch = screen.getByTestId('search-input');

    const nameRadio = screen.getByTestId('name-search-radio');

    const sendButton = screen.getByTestId('exec-search-btn');

    userEvent.type(inputSearch, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(sendButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});
