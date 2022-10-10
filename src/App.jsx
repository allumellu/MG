import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Dashboard from "./DashBoard";
import "./App.css";
import { emailValidation, letters, passwordValidation } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [signupDisable, setSignupDisable] = useState(true);
  const [pswType, setPswType] = useState(false);
  const [confirnPswType, setConfirmPswType] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState(false);
  const SignupProps = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const firstNameHandler = (e) => {
    if (e.target.value.match(letters) && e.target.value.length >= 4) {
      setFirstName(e.target.value);
      e.target.style.border = "1px solid #ccc";
    } else {
      setLastName("");
      e.target.style.border = "3.4px solid red";
    }
  };
  const lastNameHandler = (e) => {
    if (e.target.value.match(letters) && e.target.value.length >= 4) {
      setLastName(e.target.value);
      e.target.style.border = "1px solid #ccc";
    } else {
      setLastName("");
      e.target.style.border = "3.4px solid red";
    }
  };
  const emailHandler = (e) => {
    if (e.target.value.match(emailValidation)) {
      setEmail(e.target.value);
      e.target.style.border = "1px solid #ccc";
    } else {
      setEmail("");
      e.target.style.border = "3.4px solid red";
    }
  };

  const passwordHandler = (e) => {
    if (e.target.value.match(passwordValidation)) {
      setPassword(e.target.value);
      e.target.style.border = "1px solid #ccc";
    } else {
      setPassword("");
      e.target.style.border = "3.4px solid red";
    }
  };
  const confirmPasswordHandler = (e) => {
    console.log(e);
    if (e.target.value !== "" && e.target.value === password) {
      setConfirmPassword(e.target.value);
      e.target.style.border = "1px solid #ccc";
    } else {
      setConfirmPassword("");
      e.target.style.border = "3.4px solid red";
    }
  };
  const signUpButtonHandler = () => {
    setIsSignup(true);
    navigate("/dashboard");
  };

  const typePswHandler = () => {
    setPswType((current) => !current);
    if (pswType === false) {
      setTimeout(() => setPswType(false), 1000);
    }
  };
  const typeConfirmPswHandler = () => {
    setConfirmPswType((current) => !current);
    if (confirnPswType === false) {
      setTimeout(() => setConfirmPswType(false), 1000);
    }
  };

  useEffect(() => {
    if (isSignup) {
      navigate("/dashboard");
    } else navigate("/sign-up");
  }, []);

  useEffect(() => {
    if (
      firstName.length >= 4 &&
      lastName.length >= 4 &&
      email &&
      password &&
      confirmPassword &&
      !passwordEqual
    ) {
      setSignupDisable(false);
    } else {
      setSignupDisable(true);
    }
  }, [firstName, lastName, email, password, confirmPassword]);

  useEffect(() => {
    password === confirmPassword
      ? setPasswordEqual(true)
      : setPasswordEqual(false);
  }, [password, confirmPassword]);

  let navigate = useNavigate();

  return (
    <div>
      <Routes>{isSignup === false ? <Route path='/sign-up' /> : ""}</Routes>
      {!isSignup ? (
        <div className='Signupbox'>
          <div>
            <h3>Create Account</h3>
            <form>
              <div>
                <label name='firstName'>First Name:</label>
                <br />
                <input
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  minLength='4'
                  className='input'
                  onChange={firstNameHandler}
                />
              </div>
              <div>
                <label name='lastName'>Last Name:</label>
                <br />
                <input
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  className='input'
                  onChange={lastNameHandler}
                />
              </div>
              <div>
                <label name='email'>Email:</label>
                <br />
                <input
                  type='email'
                  name='email'
                  placeholder='E-mail'
                  className='input'
                  onChange={emailHandler}
                />
              </div>
              <div>
                <label name='password'>Password:</label>
                <br />
                <div className='pass-wrapper'>
                  <input
                    type={pswType ? "text" : "password"}
                    name='password'
                    placeholder='Password'
                    className='input'
                    onChange={passwordHandler}
                  />
                  <i onClick={typePswHandler}>{eye}</i>
                </div>
              </div>
              <div>
                <label name='confirmPassword'>Confirm Password:</label>
                <br />
                <div className='pass-wrapper'>
                  <input
                    type={confirnPswType ? "text" : "password"}
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    minLength='8'
                    className='input'
                    onChange={confirmPasswordHandler}
                  />
                  <i onClick={typeConfirmPswHandler}>{eye}</i>
                </div>
              </div>

              <div>
                <button
                  onClick={signUpButtonHandler}
                  type='button'
                  disabled={signupDisable}
                  className='button'>
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Dashboard SignupProps={SignupProps} />
      )}
    </div>
  );
}

export default App;
