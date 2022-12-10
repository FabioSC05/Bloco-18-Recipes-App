import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import RecipesContext from '../context/RecipesContext';

function FavoriteRecipes() {
  const { arrayFavorite } = useContext(RecipesContext);
  const [filters, setFilters] = useState(arrayFavorite);
  const title = 'Favorite Recipes';

  useEffect(() => {
    const requestLocStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFilters(requestLocStorage);
  }, [arrayFavorite]);

  const filterRecipes = ({ target }) => {
    const filterRec = arrayFavorite.filter((fav) => fav.type === target.name);
    setFilters(filterRec);
  };

  return (
    <div>
      <Header headers={ title } isRoute={ false } />

      <button
        onClick={ filterRecipes }
        type="button"
        name="meal"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        onClick={ filterRecipes }
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      <button
        onClick={ () => setFilters(arrayFavorite) }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      {filters?.map((rec, index) => (
        <div className="done-container" key={ index }>
          <Link to={ `/${rec.type}s/${rec.id}` }>
            <img
              src={ rec.image }
              alt={ rec.name }
              width="100px"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{ rec.name }</p>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { rec.type === 'meal'
                ? `${rec.nationality} - ${rec.category}` : rec.alcoholicOrNot }

            </p>
          </Link>
          <Buttons
            linkCopy={ `/${rec.type}s/${rec.id}` }
            targetId={ rec.id }
            indexData={ index }
          />
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
