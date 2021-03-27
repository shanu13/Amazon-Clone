import React,{ useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { auth } from './firebase'
import amazon  from './img/amazon.png'
import './Login.css'

function Login() {
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signIn = (e) => {
            e.preventDefault();
             // firebase login
             auth.signInWithEmailAndPassword(email, password)
                 .then(auth => {
                    if(auth) {
                        history.push('/')
                    }

                 })
                 .catch(err => alert(err.message))
    }

    const register = (e) => {
        e.preventDefault();
        // firebase register
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it succesfully created user
                console.log(auth)
                if(auth){
                    history.push('/'); // get to particular url
                }
            })
            .catch(err => alert(err.message))
            
    }

    return (
        <div className="login">
            <Link to="/">
            <img className="login_logo" src={amazon} alt=""/>
            </Link>

            <div className="login_container">
                <h1>Sign-in</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={(e) =>setEmail(e.target.value) } />

                    <h5>Password</h5>
                    <input type="password" password={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit" className="login_signInButton" onClick={signIn} >Sign In</button>
                    <p>
                    By continuing, you agree to Amazon's Fake Conditions of Use and Privacy Notice.
                    </p>

                    <button className="login_registerButton" onClick={register}  > Create your Amazon account </button>
                </form>
            </div>
           
        </div>
    )
}

export default Login
