import React from 'react'

import './sign-in.styles.scss'

const SignIn = () => {
    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form>
                <label>Email</label>
                <input type="email" name="email" label="email" required />
                <label>Password</label>
                <input type="password" name="password" label="password" required />
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default SignIn;