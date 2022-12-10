import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ domain, typeAPI }) {
  const { setUrlSelect, searchInput, urlSelect,
    setRequestAPI, requestAPI, isRequest, setIsRequest,
    targetCategory, setTargetCategory } = useContext(RecipesContext);

  const [nameSearch, setNameSearch] = useState('');
  const [change, setChange] = useState(false);
  const history = useHistory();

  const nameFirstLetter = nameSearch === 'first-letter';
  const firstLetterLength = nameFirstLetter && searchInput.length > 1;

  useEffect(() => {
    switch (nameSearch) {
    case 'ingredient':
      setUrlSelect(`https://www.${domain}.com/api/json/v1/1/filter.php?i=`);
      break;
    case 'name':
      setUrlSelect(`https://www.${domain}.com/api/json/v1/1/search.php?s=`);
      break;
    case 'first-letter':
      setUrlSelect(`https://www.${domain}.com/api/json/v1/1/search.php?f=`);
      break;
    default: break;
    }
  }, [nameSearch, domain, setUrlSelect]);

  useEffect(() => {
    setChange(true);
  }, [isRequest]);

  useEffect(() => {
    if (change) {
      setTargetCategory('');
      const fetchApi = async () => {
        setChange(false);
        if ((nameSearch.length || urlSelect.length) && !firstLetterLength) {
          const response = await fetch(`${urlSelect}${searchInput}`);
          const json = await response.json();
          if (json?.meals || json?.drinks) setRequestAPI(json);
          else global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      };
      fetchApi();
    }
  });

  useEffect(() => {
    if (requestAPI[typeAPI]?.length === 1 && !targetCategory) {
      const ids = typeAPI === 'meals' ? 'idMeal' : 'idDrink';
      history.push(`/${typeAPI}/${requestAPI[typeAPI][0][ids]}`);
    }
  }, [requestAPI, targetCategory, history, typeAPI]);

  const handleClick = () => {
    if (nameFirstLetter && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setIsRequest((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio-input"
          value="ingredient"
          onClick={ ({ target: { value } }) => setNameSearch(value) }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          data-testid="name-search-radio"
          name="radio-input"
          value="name"
          onClick={ ({ target: { value } }) => setNameSearch(value) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-input"
          value="first-letter"
          onClick={ ({ target: { value } }) => setNameSearch(value) }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Enviar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  domain: PropTypes.string.isRequired,
  typeAPI: PropTypes.string.isRequired,
};

export default SearchBar;
