import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes({ typeAPI, domain }) {
  const { requestAPI, setRequestAPI, targetCategory,
    setTargetCategory, setIsRequest, setTypeInProgress } = useContext(RecipesContext);
  const [categoryAPI, setCategoryAPI] = useState('');

  const maxRenderRecipe = 11;
  const maxRenderCategory = 5;
  const thumb = typeAPI === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const nameRecipe = typeAPI === 'meals' ? 'strMeal' : 'strDrink';
  const urlCategory = `https://www.${domain}.com/api/json/v1/1/list.php?c=list`;
  const urlFilter = `https://www.${domain}.com/api/json/v1/1/filter.php?c=`;
  const ids = typeAPI === 'meals' ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(urlCategory);
      const json = await response.json();
      setCategoryAPI(json);
    };
    fetchAPI();
    setTypeInProgress(typeAPI);
  }, [setTypeInProgress, typeAPI, urlCategory]);

  useEffect(() => {
    const fetchAPI = async () => {
      if (targetCategory) {
        const response = await fetch(`${urlFilter}${targetCategory}`);
        const json = await response.json();
        setRequestAPI(json);
      }
    };
    fetchAPI();
  }, [targetCategory, urlFilter, setRequestAPI]);

  const categoryClick = (category) => {
    if (category === targetCategory) {
      setIsRequest((prevState) => !prevState);
    } else {
      setTargetCategory(category);
    }
  };

  return (
    <div>
      <div>
        { categoryAPI[typeAPI]?.map((category, index) => (
          index < maxRenderCategory && (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              type="button"
              onClick={ () => categoryClick(category.strCategory) }
            >
              {category.strCategory}
            </button>
          )
        ))}
        <button
          onClick={ () => setIsRequest((prevState) => !prevState) }
          data-testid="All-category-filter"
          type="button"
        >
          ALL
        </button>
      </div>
      <div className="recipes-container">
        { requestAPI[typeAPI]?.map((recipe, index) => (
          index <= maxRenderRecipe && (
            <Link
              key={ index }
              to={ { pathname: `/${typeAPI}/${recipe[ids]}`, idLink: recipe[ids] } }
            >
              <div data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{recipe[nameRecipe]}</p>
                <img
                  className="img"
                  src={ recipe[thumb] }
                  alt=""
                  data-testid={ `${index}-card-img` }
                />
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  typeAPI: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
};

export default Recipes;
