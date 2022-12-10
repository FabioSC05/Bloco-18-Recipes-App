import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const MIN_LENGTH = 6;

function Login() {
  const history = useHistory();
  const [isDisable, setIsDisable] = useState(true);
  const { inputEmail,
    inputPassword,
    setInputEmail,
    setInputPassword } = useContext(RecipesContext);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('drinksToken', '1');
    setInputEmail('');
    setInputPassword('');
    history.push('/meals');
  };

  useEffect(() => {
    const validPassword = inputPassword.length > MIN_LENGTH;
    const validEmail = (/\S+@\S+\.\S+/).test(inputEmail);
    if (validEmail && validPassword) setIsDisable(false);
  }, [inputEmail, inputPassword]);

  return (
    <div className="login-container">
      <p className="login-title">iCook</p>
      <label className="login-label" htmlFor="email">
        Email
        <input
          value={ inputEmail }
          onChange={ ({ target: { value } }) => setInputEmail(value) }
          type="text"
          data-testid="email-input"
          id="email"
        />
      </label>

      <label className="login-label" htmlFor="password">
        Senha
        <input
          value={ inputPassword }
          onChange={ ({ target: { value } }) => setInputPassword(value) }
          type="password"
          data-testid="password-input"
          id="password"
        />
      </label>

      <button
        onClick={ handleClick }
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisable }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
