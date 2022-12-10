import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history }) {
  const title = 'Profile';

  const getEmail = JSON.parse(localStorage.getItem('user'));
  const emailResult = getEmail?.email;

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="done-container">
      <Header headers={ title } isRoute={ false } />
      <h3 data-testid="profile-email">
        {emailResult}
      </h3>
      <Link to="/done-recipes">
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      </Link>
      <button
        onClick={ handleClick }
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: propTypes.shape().isRequired,
};
export default Profile;
