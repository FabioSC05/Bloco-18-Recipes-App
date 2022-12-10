import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import notFavorite from '../images/whiteHeartIcon.svg';
import yesFavorite from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

function Buttons({ linkCopy, route, indexData, targetId }) {
  const { detailsAPI, arrayFavorite, setArrayFavorite } = useContext(RecipesContext);
  const [isShare, setIsShare] = useState(false);
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(false);

  const { location: { pathname, idLink } } = history;

  const ids = idLink || pathname.split('/')[2];

  const domain = route ? 'Meal' : 'Drink';
  const typeRec = route ? 'meal' : 'drink';

  const routeFav = pathname.includes('favorite-recipes');

  const dataTestIdRoute = routeFav ? `${indexData}-horizontal-` : '';

  const alcolicOrNo = detailsAPI.strAlcoholic || '';
  const nation = detailsAPI.strArea || '';

  const favoriteRecipe = {
    id: detailsAPI[`id${domain}`],
    type: typeRec,
    nationality: nation,
    category: detailsAPI.strCategory,
    alcoholicOrNot: alcolicOrNo,
    name: detailsAPI[`str${domain}`],
    image: detailsAPI[`str${domain}Thumb`],
  };

  const routeShare = `${[detailsAPI[`id${domain}`]]}${[typeRec]}`;

  const shareClick = () => {
    copy(`http://localhost:3000${linkCopy}`);
    setIsShare(true);
  };

  useEffect(() => {
    if (routeFav) {
      setIsFavorite(true);
    } else {
      setIsFavorite(arrayFavorite?.some((fav) => +fav.id === +ids));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorite));
  }, [arrayFavorite, ids, routeFav]);

  const favoriteClick = () => {
    if ((isFavorite && favoriteRecipe.id) || routeFav) {
      const requestFavorite = arrayFavorite
        .filter((fav) => +fav.id !== (+ids || +targetId));
      setArrayFavorite(requestFavorite);
    } else {
      setArrayFavorite((prevState) => [...prevState, favoriteRecipe]);
    }
    if (arrayFavorite.length === 1) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  };

  return (
    <div>
      <button
        onClick={ shareClick }
        type="button"
        src={ shareIcon }
        data-testid={ `${dataTestIdRoute}share-btn` }
      >
        <img id={ routeShare } src={ shareIcon } alt="" />

      </button>

      <button
        onClick={ favoriteClick }
        type="button"
        data-testid={ `${dataTestIdRoute}favorite-btn` }
        src={ isFavorite ? yesFavorite : notFavorite }
      >
        <img src={ isFavorite ? yesFavorite : notFavorite } alt="" />

      </button>
      { isShare && <p>Link copied!</p> }
    </div>
  );
}

Buttons.propTypes = {
  linkCopy: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  indexData: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  targetId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

Buttons.defaultProps = {
  targetId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  route: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  indexData: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
};

export default Buttons;
