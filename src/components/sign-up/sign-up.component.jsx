import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import { selectError } from "../../redux/user/user.selectors";

import "./sign-up.styles.scss";

const SignUp = () => {
  const [userCredentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState(undefined);
  const firebaseError = useSelector(selectError)
  const dispatch = useDispatch();
  const { name, email, password, repeatPassword } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      if (password != repeatPassword) {
        setError("passwords don't match")
        return;
      }

      dispatch(signUpStart({name, email, password}));
      setError(undefined);
  } 

  return (
    <div className="sign-up">
      <h2>I do not have an account</h2>
      <span>Sign up with your name, email and password</span>
      {error && <span className="error">{error}</span>}
      {firebaseError && <span className="error">{firebaseError}</span>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
