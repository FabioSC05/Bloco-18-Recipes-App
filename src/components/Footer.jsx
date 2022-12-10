import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import meals from '../images/mealIcon.svg';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="drinks">
        <img data-testid="drinks-bottom-btn" src={ drinks } alt="toDrinks" />
      </Link>

      <Link to="meals">
        <img data-testid="meals-bottom-btn" src={ meals } alt="toMeals" />
      </Link>
    </div>
  );
}

export default Footer;
