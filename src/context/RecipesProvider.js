import propTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [state, setState] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [urlSelect, setUrlSelect] = useState('');
  const [requestAPI, setRequestAPI] = useState({ drinks: [], meals: [] });
  const [isRequest, setIsRequest] = useState(false);
  const [targetCategory, setTargetCategory] = useState('');
  const [typeInProgress, setTypeInProgress] = useState('');
  const [detailsAPI, setDetailsAPI] = useState([]);
  const [arrayFavorite, setArrayFavorite] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);

  const contextType = useMemo(() => (
    { state,
      setState,
      inputPassword,
      setInputPassword,
      setInputEmail,
      inputEmail,
      searchInput,
      setSearchInput,
      urlSelect,
      setUrlSelect,
      requestAPI,
      setRequestAPI,
      isRequest,
      setIsRequest,
      targetCategory,
      setTargetCategory,
      typeInProgress,
      setTypeInProgress,
      detailsAPI,
      setDetailsAPI,
      arrayFavorite,
      setArrayFavorite,
    }
  ), [
    arrayFavorite, detailsAPI, inputEmail, inputPassword, isRequest,
    requestAPI, searchInput, state, targetCategory, typeInProgress, urlSelect,
  ]);

  return (
    <RecipesContext.Provider value={ contextType }>
      {children}
    </RecipesContext.Provider>

  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: propTypes.node.isRequired,
};
