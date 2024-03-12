import { push, set } from 'firebase/database';
import { useState } from 'react';
import {auth} from './firebase/config.js'
import { createUserWithEmailAndPassword, 
         sendPasswordResetEmail, 
         signInWithEmailAndPassword } from "firebase/auth";
import { accountsInDB } from './firebase/config.js';




function Login(){
    
    const [userCredentials, setUserCredentials] = useState({});
    const [error, setError] = useState("");
    const [loginButton, setLoginButton] = useState("Login");
    const [user, setUser] = useState();



    function handleUserCredentials(event){
        setUserCredentials({...userCredentials, [event.target.id] : event.target.value});
    }

    function displayCredentials(){
        createUserWithEmailAndPassword(auth, userCredentials.emailInput, userCredentials.passwordInput)
        .then((userCredential) => {
          // Signed up 
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorMessage == 'Firebase: Error (auth/invalid-email).'){
            setError("Please Enter a Valid Email Address");
          }
          else if(errorMessage == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
            setError("Password should be at least 6 characters");
          }
          else if(errorMessage == 'Firebase: Error (auth/email-already-in-use).'){
            setError("This email already has an account linked to it");
          }
          else{
            setError(errorMessage)
          }
          
          // ..
        });    }

        function handleLoginAttempt(){
            signInWithEmailAndPassword(auth, userCredentials.emailInput, userCredentials.passwordInput)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            push(accountsInDB, user.email);
            // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorMessage == "Firebase: Error (auth/invalid-credential)."){
                    setError("Incorrect password or username")
                }
            });
        }

        function handlePasswordReset(){
            const email = prompt("Please enter your email");
            sendPasswordResetEmail(auth, email);
            alert("Password reset email has been sent.")
        }


    return(

        <div className='loginBackground'>
             <div className='loginCard'>
                <h1 id='loginHeader'>{loginButton}</h1>
                <input onChange={handleUserCredentials} id='emailInput' className='inputField' type="text" placeholder='Email' />
                <input onChange={handleUserCredentials} id='passwordInput' className='inputField' type="password" placeholder='Password' />
                <button onClick={handleLoginAttempt} id='loginButton' className='actionButtons'>{loginButton}</button>
                <div id='errorStatement'>
                    <p>{error}</p>
                    <br />
                    <p className='bottomLinks'>Sign Up?</p>
                    <p className='bottomLinks' onClick={handlePasswordReset}>Reset Password?</p>
                </div>
            </div>
        </div>
       
    );
}


export default Login;
