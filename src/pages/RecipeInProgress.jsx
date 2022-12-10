import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import Buttons from '../components/Buttons';
import '../App.css';
import requestLocalStorage from '../tests/helpers/requestLocalStorage';

function RecipeInProgress({ history, match: { path, params: { id } } }) {
  const { setDetailsAPI, detailsAPI } = useContext(RecipesContext);

  const route = path.includes('meals');

  const typeRecipe = route ? 'meals' : 'drinks';

  const urlCopy = `/${typeRecipe}/${id}`;

  const domain = route ? 'themealdb' : 'thecocktaildb';

  const urlDetails = `https://www.${domain}.com/api/json/v1/1/lookup.php?i=${id}`;

  const [checkbox, setCheckbox] = useState([]);

  useEffect(() => {
    const checkedSave = JSON.parse(localStorage
      .getItem('checkedInProgress')) || {};
    const fetchAPI = async () => {
      const response = await fetch(urlDetails);
      const json = await response.json();
      setDetailsAPI(json[typeRecipe][0]);
    };
    fetchAPI();
    if (checkedSave[typeRecipe]) setCheckbox(checkedSave[typeRecipe][id]);
  }, [setDetailsAPI, id, typeRecipe, urlDetails]);

  const recInProgress = requestLocalStorage();

  const requestingredients = Object.entries(detailsAPI)
    .filter((e) => e[0].includes('strIngredient'))
    .filter((ev) => ev[1]?.length).map((elem) => elem[1]);

  useEffect(() => {
    const itensChecked = { [typeRecipe]: { ...recInProgress[typeRecipe],
      [id]: checkbox } };
    localStorage.setItem('checkedInProgress', JSON.stringify(itensChecked));
  }, [detailsAPI, checkbox, id, recInProgress, typeRecipe]);

  const handleChecked = ({ target: { checked, name } }) => {
    if (checked) {
      setCheckbox((prevState) => [...prevState, name]);
    } else {
      const removeChecked = checkbox.filter((ingredient) => ingredient !== name);
      setCheckbox(removeChecked);
    }
  };

  const isSelect = (ingredient) => checkbox?.some((check) => check === ingredient);

  const requestChecked = checkbox && requestingredients?.map((check) => checkbox
    .some((loc) => loc === check));

  const abillityFinish = requestChecked?.every((check) => check === true);

  const handleClick = () => {
    const newObj = {
      id,
      type: typeRecipe === 'meals' ? 'meal' : 'drink',
      nationality: typeRecipe === 'meals' ? detailsAPI.strArea : '',
      category: detailsAPI.strCategory,
      alcoholicOrNot: typeRecipe === 'drinks' ? detailsAPI.strAlcoholic : '',
      name: typeRecipe === 'drinks' ? detailsAPI.strDrink : detailsAPI.strMeal,
      image: typeRecipe === 'drinks'
        ? detailsAPI.strDrinkThumb : detailsAPI.strMealThumb,
      doneDate: new Date().toISOString(),
      tags: detailsAPI.strTags !== null ? detailsAPI.strTags.split(',') : [],
    };
    const getStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const enterStorage = getStorage === null ? [] : getStorage;
    localStorage.setItem('doneRecipes', JSON.stringify([...enterStorage, newObj]));
    history.push('/done-recipes');
  };

  return (
    <div className="foodContainer">
      <p data-testid="recipe-title">
        { detailsAPI.strDrink || detailsAPI.strMeal }
      </p>
      <img
        className="img"
        src={ detailsAPI.strDrinkThumb || detailsAPI.strMealThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <Buttons linkCopy={ urlCopy } route={ route } />
      <h3 data-testid="recipe-category">{detailsAPI.strCategory}</h3>
      { detailsAPI.strAlcoholic && <p>{detailsAPI.strAlcoholic}</p> }
      <p data-testid="instructions">{detailsAPI.strInstructions}</p>

      { requestingredients?.map((ingredient, index) => (
        <div key={ index }>
          <label
            className={ isSelect(ingredient) ? 'riscar' : 'noRiscar' }
            htmlFor={ `${index}-ingredients` }
            data-testid={ `${index}-ingredient-step` }
          >
            {`${ingredient}: ${detailsAPI[`strMeasure${index + 1}`]}`}
            <input
              id={ `${index}-ingredients` }
              type="checkbox"
              checked={ requestChecked && requestChecked[index] }
              name={ ingredient }
              onChange={ handleChecked }
            />
          </label>
        </div>

      ))}

      <button
        type="button"
        disabled={ !abillityFinish }
        className="button-position"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
