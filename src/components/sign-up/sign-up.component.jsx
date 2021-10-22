import React from 'react';

import './sign-up.styles.scss'

const SignUp = () => {
    return (
        <div className="sign-up">
            <h2>I do not have an account</h2>
            <span>Sign up with your name, email and password</span>
            <form>
                <label>Manager Name</label>
                <input type="text" name="name" required />
                <label>Email</label>
                <input type="email" name="email" required />
                <label>Password</label>
                <input type="password" name="password" required />
                <label>Repeat Password</label>
                <input type="password" name="repeatPassword" required />
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;