import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { setUrlSelect, setIsRequest } = useContext(RecipesContext);
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const title = 'Meals';

  useEffect(() => {
    setUrlSelect(urlMeals);
    setIsRequest((prevState) => !prevState);
  }, [setUrlSelect, setIsRequest]);

  return (
    <div className="foodContainer">
      <Header headers={ title } isRoute />
      <SearchBar domain="themealdb" typeAPI="meals" />
      <Recipes typeAPI="meals" domain="themealdb" />
      <Footer />
    </div>
  );
}

export default Meals;
