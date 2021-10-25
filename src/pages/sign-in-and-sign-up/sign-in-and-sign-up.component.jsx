import React from "react";
import { useSelector } from "react-redux";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectError, selectLoading } from "../../redux/user/user.selectors";

import "./sign-in-and-sign-up.styles.scss";

const SignInWithSpinner = WithSpinner(SignIn);
const SignUpWithSpinner = WithSpinner(SignUp);

const SignInAndSignUp = () => {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  return (
    <div>
      <h1 className="singin-title">Please log in or sign up to continue</h1>
      {error && <span className="error">{error}</span>}
      <div className="sign-in-and-sign-up">
        <SignInWithSpinner isLoading={isLoading} />
        <SignUpWithSpinner isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SignInAndSignUp;
