const requestLocalStorage = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
};

export default requestLocalStorage;
