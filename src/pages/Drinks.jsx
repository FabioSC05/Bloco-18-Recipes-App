import React, { useContext, useEffect } from 'react';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { setUrlSelect, setIsRequest } = useContext(RecipesContext);

  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const title = 'Drinks';

  useEffect(() => {
    setUrlSelect(urlDrinks);
    setIsRequest((prevState) => !prevState);
  }, [setIsRequest, setUrlSelect]);

  return (
    <div className="foodContainer">
      <Header headers={ title } isRoute />
      <SearchBar domain="thecocktaildb" typeAPI="drinks" />
      <Recipes typeAPI="drinks" domain="thecocktaildb" />
      <Footer />
    </div>
  );
}

export default Drinks;
