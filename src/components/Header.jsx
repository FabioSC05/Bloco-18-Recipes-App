import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

function Header({ headers, isRoute }) {
  const { setSearchInput } = useContext(RecipesContext);
  const [showSearch, setShowSearch] = useState(false);

  const showOrHide = () => setShowSearch((prevState) => !prevState);

  return (
    <div>
      <h1 data-testid="page-title">{ headers }</h1>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      </Link>
      { isRoute && (
        <button type="button" onClick={ showOrHide }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="" />
        </button>
      )}

      { showSearch && <input
        onChange={ ({ target: { value } }) => setSearchInput(value) }
        type="text"
        data-testid="search-input"
      />}
    </div>
  );
}

Header.propTypes = {
  headers: PropTypes.string.isRequired,
  isRoute: PropTypes.bool.isRequired,
};

export default Header;
