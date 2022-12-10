import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderWith';

jest.setTimeout(10000);

const fakeRecipe = {
  id: '55428',
  type: 'meal',
  nationality: 'Brazilian',
  category: 'Beef',
  alcoholicOrNot: '',
  name: 'Prime Rib',
  image: '',
  doneDate: '',
  tags: [],
  link: '',
};
localStorage.setItem('doneRecipes', JSON.stringify([fakeRecipe]));

describe('Testa os requisitos finais', () => {
  test('Acessa os botões', async () => {
    renderPath('/drinks');
    await waitFor(() => expect(screen.getByText('A1')).toBeInTheDocument(), { timeout: 10000 });
    const btnName = screen.getByTestId('name-search-radio');
    userEvent.click(btnName);
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[0]);
    const text = screen.getByTestId('search-input');
    userEvent.type(text, 'A1');
    userEvent.click(buttons[1]);
    await waitFor(() => expect(screen.getByText(/start/i)).toBeInTheDocument(), { timeout: 10000 });
    userEvent.click(screen.getByRole('button', { name: 'Start Recipe' }));
    await waitFor(() => expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument(), { timeout: 10000 });
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((ele, ind) => {
      userEvent.click(checkboxes[ind]);
    });
    userEvent.click(screen.getByRole('button', { name: 'Finalizar Receita' }));
  });
});
